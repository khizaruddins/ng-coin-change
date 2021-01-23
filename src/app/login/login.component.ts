import { MockAuthService } from './../auth/mock-auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: MockAuthService
  ) { }
  signinForm: FormGroup;
  signupForm: FormGroup;
  loginOrSignup: string = 'login';
  errorMessage: string = '';

  ngOnInit(): void {
    if (localStorage.getItem('userInfo') === null) {
      this.initForm();
    } else {
      this.router.navigate(['/changeBox']);
    }
  }

  initForm() {
    this.signinForm = this.fb.group({
      userId: [null, [Validators.required, Validators.pattern('^[A-Za-z0-9_-]*$')]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*[0-9])(?=.*[!@#$*])[a-zA-Z0-9!@#$*]+$')],]
    });

    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      address: [null, [Validators.required]],
      contact: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      userId: [null, [Validators.required, Validators.pattern('^[A-Za-z0-9_-]*$')]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*[0-9])(?=.*[!@#$*])[a-zA-Z0-9!@#$*]+$')],]
    });
  }

  changeTab(value: string): void {
    this.signinForm.markAsUntouched();
    this.signupForm.markAsUntouched();
    this.loginOrSignup = value;
  }

  onLoginFormSubmit(event) {
    event.preventDefault();
    if (this.signinForm.valid) {
      localStorage.setItem('userInfo', JSON.stringify({
        userId: this.signinForm.get('userId').value,
      }));
      this.authService.setLoggedInStatus(true);
      this.router.navigate(['/changeBox']);
    } else {
      this.signinForm.markAllAsTouched();
    }
  }


  onSignupFormSubmit(event) {
    event.preventDefault();
    if (this.signupForm.valid) {
      if (localStorage.getItem('users') !== null) {
        let users = JSON.parse(localStorage.getItem('users'));
        let foundUser = users.find(item => item.userId === this.signupForm.get('userId').value);
        if (!foundUser) {
          users.push({
            ...this.signupForm.value
          });
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('userInfo', JSON.stringify({
            userId: this.signupForm.get('userId').value
          }));
          this.authService.setLoggedInStatus(true);
          this.router.navigate(['/changeBox']);
        } else {
          this.errorMessage = 'User already exists!! Please login';
          setTimeout(() => {
            this.errorMessage = '';
          }, 4000);
        }
      } else {
        let arr = [];
        arr.push({
          ...this.signupForm.value
        })
        localStorage.setItem('users', JSON.stringify(arr));
        localStorage.setItem('userInfo', JSON.stringify({
          userId: this.signupForm.get('userId').value
        }));
        this.authService.setLoggedInStatus(true);
        this.router.navigate(['/changeBox']);
      }
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

}
