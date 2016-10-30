// counter.ts
import { ActionReducer, Action } from '@ngrx/store';

export const SET_USER = 'INCREMENT';
export const ADD_USER_WALLET = 'ADD_USER_WALLET';
export const RECIEV_MONEY = 'RECIEV_MONEY';
export const userReducer: ActionReducer<Object> = (state: User = undefined, action: Action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case ADD_USER_WALLET:
      let newState = Object.assign({}, state);
      newState.wallets.push(action.payload);
      return newState;
    case RECIEV_MONEY:
      return action.payload;
      // return Object.assign(
      //   {},
      //   state,
      //   {wallets: state.wallets.map(wallet => {
      //       if (wallet.id === +action.payload.to) {
      //         return Object.assign(
      //             {},
      //             wallet,
      //             {state: wallet.state + (+action.payload.amount)}
      //           );
      //       } else {
      //         return wallet;
      //       }
      //     })
      //   });
    default:
      return state;
  }
}
export interface Wallet {
  id: number;
  state: number;
  name: string;
}
export interface User {
  id: number;
  name: string;
  selected_wallet: number;
  wallets: Wallet[];
}
