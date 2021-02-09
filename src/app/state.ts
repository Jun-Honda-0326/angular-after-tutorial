import { User } from './user';

export interface UserListFilter {
  nameFilter: string;
}

export interface State {
  userList: {
    items: User[];
    filter: UserListFilter;
  }
  userDertail: {
    user: User | null;
  }
}

export const initialState = {
  userList: {
    items: [],
    filter: {
      nameFilter: '',
    }
  },
  userDetail: {
    user: null,
  }
};
