import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SET_USER, ADD_USER_WALLET, RECIEV_MONEY } from '../reducer/user';
import { SET_USERS } from '../reducer/users';
import { SET_TRANSACTION } from '../reducer/transaction';
import { AuthService } from '../services/auth.service';
import { WalletService } from '../services/wallet.service';
@Injectable()
export class StoreActions {
  constructor(private store: Store<any>,
              private auth: AuthService,
              private wallet: WalletService) {}
  getUserChanges() {
    this.auth.getUser().subscribe(res => {
      this.store.dispatch({
        type: RECIEV_MONEY,
        payload: res
      });
    });
  }
  addWallet(wallet) {
    this.store.dispatch({
      type: ADD_USER_WALLET,
      payload: wallet
    });
  }
  setUser(user) {
    this.store.dispatch({
      type: SET_USER,
      payload: user
    });
  }
  setUsers(users) {
    this.store.dispatch({
      type: SET_USERS,
      payload: users
    });
  }
  setTransaction(trans) {
    this.store.dispatch({
      type: SET_TRANSACTION,
      payload: trans
    });
  }
  getUsers() {
    this.auth.getUsers().subscribe(res => {
      this.store.dispatch({
        type: SET_USERS,
        payload: res
      });
    });
  }
  getTransaction() {
    this.wallet.getTransaction()
      .subscribe(res => {
        this.store.dispatch({
          type: SET_TRANSACTION,
          payload: res
        });
      });
  }
}
