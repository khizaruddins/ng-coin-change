import { MockAuthService } from './../auth/mock-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private mockAuth: MockAuthService
  ) { }
  isAuthenticated: Boolean = false;
  userId: string = '';

  ngOnInit(): void {
    this.initLoggedInUserObservable();
  }

  initLoggedInUserObservable() {
    this.mockAuth.getLoggedInStatus()
      .subscribe(value => {
        this.isAuthenticated = value;
        if (this.isAuthenticated) {
          this.userId = JSON.parse(localStorage.getItem('userInfo')).userId;
        }
      });
  }

}
