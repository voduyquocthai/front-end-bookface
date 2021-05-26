import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../user/user';
import {UsersService} from '../user/service/users.service';
import {LocalStorageService} from 'ngx-webstorage';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  userActivated: User[];
  userBlocked: User[];
  stoMes: User[];
  isAdmin: boolean;
  idAdmin: number;
  constructor(private userService: UsersService,
              private localStorage: LocalStorageService) {
    this.idAdmin = this.localStorage.retrieve('userId')
  }

  ngOnInit(): void {
    this.getAllUserActivated();
  }

  event() {
   this.getAllUserActivated()
  }

  eventBlock() {
    this.getAllUserBlocked()
  }

  getAllUserActivated() {
    return this.userService.getAllUserActivated().subscribe(value => {
      this.userActivated = value;
      console.log(this.userActivated);
    });
  }

  getAllUserBlocked() {
    return this.userService.getAllUserBlocked().subscribe(value => {
      this.userBlocked = value;
      console.log(this.userBlocked);
    });
  }

}
