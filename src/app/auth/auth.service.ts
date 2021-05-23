import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable, of, throwError} from 'rxjs';
import {SignupRequestPayload} from './signup/signup-request.payload';
import {LoginRequestPayload} from './login/login.request.payload';
import {LoginResponse} from './login/login.response.payload';
import {delay, tap} from 'rxjs/operators';
import {User} from '../user/user';
import { DUMMY_USER } from '../dummy-const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  // @Output() username: EventEmitter<string> = new EventEmitter();
  // @Output() userId: EventEmitter<number> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  };

  private apiServerUrl = environment.apiBaseServer;

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(`${this.apiServerUrl}/auth/signup`, signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<LoginResponse> {
    //1. This method needs to be refactored
    //2. When login, the application should always clear the local storage before sending the request
    //3. pipe(map()) should only map the value to another value. It should do other things
    //   (which makes this method produce side effect)
    //4. The login method should return the Observable<LoginResponse> and let the caller decide
    //   what to do with the response data. This service should only do one thing and should be reusable
    //   This login method should not emit any data.

    // return this.httpClient.post<LoginResponse>(`${this.apiServerUrl}/auth/login`,
    //   loginRequestPayload).pipe(map(data => {
    //   this.localStorage.store('authenticationToken', data.authenticationToken);
    //   this.localStorage.store('username', data.username);
    //   this.localStorage.store('refreshToken', data.refreshToken);
    //   this.localStorage.store('expiresAt', data.expiresAt);
    //   this.localStorage.store('userId', data.userId);
    //   this.loggedIn.emit(true);
    //   this.username.emit(data.username);
    //   this.userId.emit(data.userId);
    //   return true;
    // }));

    this.httpClient
    .post<LoginResponse>(`${this.apiServerUrl}/auth/login`, loginRequestPayload)
    .pipe(tap(data => this.storeUserCredential(data)));

    //This is used for mocking a http response after 5 second.
    return of(DUMMY_USER).pipe(delay(5000), tap(data => {
      console.log("Login Success")
      this.storeUserCredential(data)
    }));

  }

  storeUserCredential(loginResponse: LoginResponse) {
      this.localStorage.store('authenticationToken', loginResponse.authenticationToken);
      this.localStorage.store('username', loginResponse.username);
      this.localStorage.store('refreshToken', loginResponse.refreshToken);
      this.localStorage.store('expiresAt', loginResponse.expiresAt);
      this.localStorage.store('userId', loginResponse.userId);
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>(`${this.apiServerUrl}/auth/refresh/token`,
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  logout() {
    this.httpClient.post(`${this.apiServerUrl}/auth/logout`, this.refreshTokenPayload,
      {responseType: 'text'})
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      });
    this.localStorage.clear('authenticationtoken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('userId');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getUserId() {
    return this.localStorage.retrieve('userId');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUserByUserName(username: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiServerUrl}/users/${username}`);
  }

}

