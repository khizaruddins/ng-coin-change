import { Subscription } from 'rxjs';
import { MockAuthService } from './../auth/mock-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    public authService: MockAuthService,
    private router: Router
  ) { }
  isAuthenticated: boolean = false;
  loginStatusSubs: Subscription;
  userId: string = '';

  ngOnInit(): void {
    this.initLoggedinStatusObservable()
  }

  initLoggedinStatusObservable() {
    this.loginStatusSubs = this.authService.getLoggedInStatus()
      .subscribe((value: boolean) => {
        this.isAuthenticated = value;
        if (JSON.parse(localStorage.getItem('userInfo'))) {
          this.userId = JSON.parse(localStorage.getItem('userInfo')).userId;
        }
      })
  }

  signout() {
    this.authService.setLoggedInStatus(false);
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login'])
  }

  ngOnDestroy(): void {
    if (this.loginStatusSubs) {
      this.loginStatusSubs.unsubscribe();
    }
  }


}
