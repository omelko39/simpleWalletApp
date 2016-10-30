import { Injectable } from '@angular/core';
import { ApiHttp } from './api.service';

@Injectable()
export class WalletService {
  constructor(private apiHttp: ApiHttp) {}
  create(name) {
    let body = {
      name: name
    };
   return this.apiHttp.post('wallet', body)
      .map(res => res.json());
  }
  delete(id) {
    return this.apiHttp.delete(`wallet/${id}`)
      .map(res => res.json());
  }
  getWallets() {
    return this.apiHttp.get('wallets')
      .map(res => res.json());
  }
  getTransaction() {
    return this.apiHttp.get('transaction')
      .map(res => res.json());
  }
  doTansaction(wFrom, wTo, amount) {
    let body = {
      from: +wFrom,
      to: +wTo,
      amount: amount
    };
    return this.apiHttp.post('transaction', body)
      .map(res => res.json());
  }
}
