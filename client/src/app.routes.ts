import { Routes } from '@angular/router';
import { Home } from './home';
import { Login } from './login';
import { AuthGuard, UserResolve } from './common/auth.guard';

export const routes: Routes = [
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: 'home',   component: Home, canActivate: [AuthGuard], resolve: {user: UserResolve} },
  { path: '**',     component: Login },
];
