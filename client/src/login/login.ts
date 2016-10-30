import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { AuthService } from '../services/auth.service';

const styles   = require('./login.css');
const template = require('./login.html');
@Component({
  selector: 'login',
  template: template,
  styles: [ styles ]
})
export class Login {
  constructor(public toast: ToastsManager,
              public router: Router,
              public auth: AuthService) {
  }
  login(username: string, pass: string) {
    if (username && pass) {
      this.auth.login(username, pass).subscribe(res => {
        if (res.success) {
          localStorage.setItem('loggedIn', '1');
          this.toast.success(res.status);
          this.router.navigate(['/home']);
        }
      }, err => {
        err = err.json();
        this.toast.error(err.error, err.error_description);
      });
    }
  }
}
