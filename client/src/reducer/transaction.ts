// counter.ts
import { ActionReducer, Action } from '@ngrx/store';

export const SET_TRANSACTION = 'SET_TRANSACTION';
export const transactionReducer: ActionReducer<Array<any>> = (state = [], action: Action) => {
  switch (action.type) {
    case SET_TRANSACTION:
      return action.payload;

    default:
      return state;
  }
}
