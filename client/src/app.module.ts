import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule, BrowserXhr } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AuthGuard, UserResolve } from './common/auth.guard';
import { Home } from './home';
import { Login } from './login';
import { App } from './app';

import { routes } from './app.routes';
import { ToastModule } from 'ng2-toastr';
import { MaterialModule } from '@angular/material';
import { CustomBrowserXhr } from './services/BaseXhr';
import { AuthService } from './services/auth.service';
import { WalletService } from './services/wallet.service';
import { ApiHttp, API_HTTP_PROVIDERS } from './services/api.service';
import { SocketService } from './services/socket.service';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './reducer/users';
import { transactionReducer } from './reducer/transaction';
import { StoreActions } from './action/Actions';
import { userReducer } from './reducer/user';

@NgModule({
  bootstrap: [App],
  declarations: [
    Home, Login, App
  ],
  imports: [
    ToastModule,
    MaterialModule.forRoot(),
    HttpModule, BrowserModule, FormsModule,
    StoreModule.provideStore({
      user: userReducer,
      users: usersReducer,
      transaction: transactionReducer
    }),
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [
    AuthService,
    API_HTTP_PROVIDERS,
    WalletService,
    StoreActions,
    UserResolve,
    SocketService,
    AuthGuard, ...AUTH_PROVIDERS,
    {provide: BrowserXhr, useClass: CustomBrowserXhr}
  ]
})
export class AppModule {}
