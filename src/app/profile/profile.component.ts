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
    private router: Router
  ) { }
  routeParamsSubs: Subscription;
  userData;

  ngOnInit(): void {
    this.initGetRouteParams();
  }
  initGetRouteParams() {
    this.routeParamsSubs = this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get('userId').toUpperCase());
      let paramsUserId = params.get('userId').toUpperCase();
      if (localStorage.getItem('users') !== null) {
        let users = JSON.parse(localStorage.getItem('users'));
        let userId = JSON.parse(localStorage.getItem('userInfo')).userId;
        let foundUser;
        if (userId !== paramsUserId) {
          this.router.navigate(['profile', userId]);
        } else {
          foundUser = users.find(item => item.userId === paramsUserId);
        }
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
