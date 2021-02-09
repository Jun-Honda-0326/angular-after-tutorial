import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

import { User } from '../user';
import { Store } from '../service/store.service';

@Injectable({ providedIn: 'root' })
export class UserListUseCase {

  get filter$() {
    return this.store.select(state => state.userList.filter);
  }

  constructor(private http: HttpClient, private store: Store) { }

  async fetchUsers() {
    const users = await this.http
      .get<{ data: User[] }>("https://reqres.in/api/users")
      .pipe(map(res => res.data))
      .toPromise();

    this.store.update(state => ({
      ...state,
      userList: {
        ...state.userList,
        items: users
      }
    }));
  }

  setNameFilter(nameFilter: string) {
    this.store.update(state => ({
      ...state,
      userList: {
        ...state.userList,
        filter: {
          nameFilter
        }
      }
    }));
  }

}
