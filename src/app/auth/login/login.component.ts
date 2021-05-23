import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequestPayload} from './login.request.payload';
import {AuthService} from '../auth.service';
import {StateService} from '../../services/state.service'
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;

  constructor(private authService: AuthService,
              private stateService: StateService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      }
    )
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email'
            + ' and activate your account before you Login!';
        }
      });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    //This make the site response faster since the router take place constantly and
    //does not wait the login data return. If wait is needed, please use
    //Angular Router Resolver
    //Reference: https://www.tiepphan.com/angular-route-resolver/#conclusion
    this.router.navigateByUrl('');
    this.authService.login(this.loginRequestPayload).subscribe(data => {
      //As soon as the login response return, emit the data using this observable to other components that subcribe to this Observable
      this.stateService.userLoginObservable.next({
        username: data.username,
        userid: data.userId
      })
      this.toastr.success('Login Successful');
    }, error => {
      this.toastr.error('Login Failed. Please check your credentials and try again.')
      throwError(error);
    });
  }
}

