import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../service/users.service';
import {User} from '../user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  listFriend: User[] = [];
  @Input() id = -1;
  user: User = {};
  check: boolean;

  constructor(private userService: UsersService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
      this.getAllFriend(this.id);
      this.getUser(this.id);
      this.check = true;
    });
  }

  ngOnInit(): void {
    this.getAllFriend(this.id);
  }

  getAllFriend(id: number) {
    this.userService.getAllFriend(id).subscribe(users => {
      this.listFriend = users;
    });
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe(user => {
      this.user = user;
    });
  }

  findFriend(key: string) {
    const friends = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listFriend.length; i++) {
      if (this.listFriend[i].username.includes(key)) {
        friends.push(this.listFriend[i]);
      }
    }
    this.listFriend = friends;
  }
}
