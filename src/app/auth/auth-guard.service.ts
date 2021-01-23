import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MockAuthService } from './mock-auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: MockAuthService, public router: Router) { }
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}