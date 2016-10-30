import { ApiHttp } from './api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private apiHttp: ApiHttp) {}
  login(user, pass) {
    let body = {
      username: user,
      password: pass
    };
    return this.apiHttp.post('login', body)
      .map(res => res.json());
  }

  logOut() {
    return this.apiHttp.get('logOut')
      .map(res => { localStorage.clear(); });
  }
  getUser() {
    return this.apiHttp.get('user')
      .map(res => res.json());
  }
  getUsers() {
    return this.apiHttp.get('users')
      .map(res => res.json());
  }

  isLoggedIn() {
    return localStorage.getItem('leggedIn');
  }
}
