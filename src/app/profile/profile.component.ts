import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }
  routeParamsSubs: Subscription;
  userData;

  ngOnInit(): void {
    this.initGetRouteParams();
  }
  initGetRouteParams() {
    this.routeParamsSubs = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get('userId').toUpperCase());
      let userId = params.get('userId').toUpperCase();
      if (localStorage.getItem('users') !== null) {
        let users = JSON.parse(localStorage.getItem('users'));
        let foundUser = users.find(item => item.userId === userId);
        this.userData = foundUser ? foundUser : null;
      } else {
        this.userData = null;
      }
    })
  }

  ngOnDestroy(): void {
    if (this.routeParamsSubs) {
      this.routeParamsSubs.unsubscribe();
    }
  }

}
