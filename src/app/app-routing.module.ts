import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { ChangeBoxComponent } from './change-box/change-box.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'changeBox', component: ChangeBoxComponent, canActivate: [AuthGuardService] },
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuardService], canActivateChild: [AuthGuardService] },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
