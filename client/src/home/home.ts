import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WalletService } from '../services/wallet.service';
import { ToastsManager } from 'ng2-toastr';
import { SocketService } from '../services/socket.service';
import { Store } from '@ngrx/store';
import { StoreActions } from '../action/Actions';
import { User, Wallet } from '../reducer/user';
const styles = require('./home.css');
const template = require('./home.html');

@Component({
  selector: 'home',
  template: template,
  styles: [ styles ],
})
export class Home {
  private user: User;
  private users;
  private wallets: Array<Wallet>;
  private selectedWallet: Wallet;
  private transactions = [];
  private isDashboard = true;
  private transTo;
  private internalSelectedWallet;
  private selectedFrom;
  private options;

  constructor(public router: Router,
              private route: ActivatedRoute,
              private toast: ToastsManager,
              private socket: SocketService,
              private store: Store<any>,
              private action: StoreActions,
              private walletApi: WalletService) {}
  ngOnInit() {
    //STORE SUBSCRIBE
   this.action.getTransaction();
    this.store.select('users')
      .subscribe(users => {
        this.users = users;
      });
   this.store.select('transaction')
     .subscribe((trans: any[]) => {
       this.transactions = trans;
     });
   this.store.select('user')
      .subscribe((user: User) => {
        if (user) {
          this.user = Object.assign({}, {id: user.id, name: user.name});
          this.wallets = Object.assign([], user.wallets);
          this.selectedWallet = user.wallets
            .find(w => w.id === user.selected_wallet);
        }
    });
    //RESOLVE HANDLE
    this.route.data.forEach(data => {
      let user = data['user'];
      if (user.error) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
      if (user.hasOwnProperty('id'))
        this.action.setUser({
          id: user.id,
          name: user.name,
          selected_wallet: user.selected_wallet,
          wallets: user.wallets
        });
      //SOCKET INIT
      this.socket.getSocket(data['user'].id).subscribe((msg: string) => {
        let to = msg.split(',')[0];
        let amount = +msg.split(',')[1];
        this.toast.info(`Reciev ${amount}$ to wallet ${to}`);
        this.action.getUserChanges();
        this.action.getTransaction();
      });
    });
  }

  cretaWallet(name) {
    this.walletApi.create(name)
      .subscribe(res => {
        if (res.success) {
          this.toast.success('create wallet succes');
          this.action.addWallet(res['wallet']);
        }
      });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  getUsers() {
    this.action.getUsers();
  }
  send(from, amount) {
    let to = this.transTo.w;
    this.walletApi.doTansaction(from, to, amount).subscribe(res => {
      if (res.success === false) {
        this.toast.error(res.msg);
      } else {
        this.transTo = false;
        this.toast.success('Transaction success');
        this.action.getUserChanges();
        this.action.getTransaction();
      }
    });
  }
  sendInternal(from, amount) {
    let to = this.internalSelectedWallet.w.id;
    this.walletApi.doTansaction(from, to, amount).subscribe(res => {
        if (res.success === false) {
        this.toast.error(res.msg);
      } else {
        this.toast.success('Transaction success');
          this.internalSelectedWallet = false;
          this.action.getUserChanges();
        this.action.getTransaction();
      }
    });
  }
}
