import { Component } from '@angular/core';
import { UserListUseCase } from './usecase/user-list.usercase.';
import { UserListFilter } from './state';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users$ = this.userList.users$;
  userListFilter$ = this.userList.filter$;

  constructor(private userList: UserListUseCase) {
  }

  ngOnInit() {
    this.userList.fetchUsers();
  }

  setUserListFilter(value: UserListFilter) {
    this.userList.setNameFilter(value.nameFilter);
  }

}
