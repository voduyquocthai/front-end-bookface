import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { LoginComponent } from '../auth/login/login.component';
import { User } from '../user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  username: string;

  @Input()
  userId: number;

  @Input()
  user: User;

  @Output()
  logOutEvent = new EventEmitter<boolean>()

  constructor(private router: Router) { }

  //The header component should only display the data and emit the event.
  //Let the parent component handles all of the data in and out
  ngOnInit() {
  }

  goToUserProfile() {
    this.router.navigateByUrl('users/user-profile/' + this.userId);
  }

  logout() {
    this.logOutEvent.emit(true);
  }

}

