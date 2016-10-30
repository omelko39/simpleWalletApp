import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('loggedIn')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable()
export class UserResolve  {
  constructor(
    private auth: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.auth.getUser();
  }
}
