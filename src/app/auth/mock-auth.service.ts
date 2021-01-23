import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private loggedInStatus;
  isAuthenticatedStatus: boolean;
  constructor() {
    let userInfoStatus = localStorage.getItem('userInfo') !== null ? true : false;
    this.isAuthenticatedStatus = userInfoStatus;
    this.loggedInStatus = new BehaviorSubject<boolean>(userInfoStatus);
  }

  ngOnInit() {
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  isAuthenticated() {
    return this.isAuthenticatedStatus;
  }

  setLoggedInStatus(value: boolean): void {
    this.isAuthenticatedStatus = value;
    this.loggedInStatus.next(value);
  }
}