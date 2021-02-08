import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from 'rxjs/operators';

import { User } from '../user';



@Injectable({ providedIn: 'root' })
export class UserService {

  private _users$ = new BehaviorSubject<User[]>([]);

  get users$() {
    return this._users$.asObservable();
  }

  constructor(private http: HttpClient) { }

  fetchUsers(): void {
    this.http
      .get<{ data: User[] }>("https://reqres.in/api/users")
      .pipe(map(res => res.data))
      .subscribe(users => {
        this._users$.next(users);
      });
  }
}
