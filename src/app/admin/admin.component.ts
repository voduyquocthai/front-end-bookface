import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../user/user';
import {UsersService} from '../user/service/users.service';

const API_URL = `${environment.apiUrl}`;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  userActivated: User[];
  userBlocked: User[];

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.getAllUserActivated();

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

  blockAUser(id: string) {
    return this.userService.blockAUser(id).subscribe(value => {
      this.userActivated = value;
    })
  }
}
