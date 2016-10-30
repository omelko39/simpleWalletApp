// counter.ts
import { ActionReducer, Action } from '@ngrx/store';
import { User } from './user';

export const SET_USERS = 'SET_USERS';
export const usersReducer: ActionReducer<Array<any>> = (state: Array<any> = [], action: Action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;

    default:
      return state;
  }
}
