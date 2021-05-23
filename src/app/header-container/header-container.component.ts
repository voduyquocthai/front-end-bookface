import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.css']
})
export class HeaderContainerComponent implements OnInit, OnDestroy {

  guestBrowsing: boolean;

  username: string;

  userId: string;

  subcription: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private stateService: StateService) {}

  ngOnInit(): void {
    this.guestBrowsing = true;
    this.subcription = this.stateService.userLoginObservable
    .subscribe(data => {
        this.guestBrowsing = false;
        this.username = data.username;
        this.userId = data.userid;
    })
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  handleLogOutEvent(loggedOut: boolean): void {
    if (loggedOut) {
      this.router.navigateByUrl('/login');
      //Clear the login data hold by this ReplaySubject
      this.stateService.userLoginObservable = new ReplaySubject<any>(1);
      this.authService.logout();
    }
  }

}
