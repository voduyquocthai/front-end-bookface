import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Router} from '@angular/router';

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

