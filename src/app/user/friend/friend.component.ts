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
  friendList: User[] = [];
  @Input() id = -1;
  user: User = {};

  constructor(private userService: UsersService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
      this.getAllFriend(this.id);
      this.getUser(this.id);
    });
  }

  ngOnInit(): void {
    this.getAllFriend(this.id);
  }

  getAllFriend(id: number) {
    this.userService.getAllFriend(id).subscribe(users => {
      this.listFriend = users;
      this.friendList = users;
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
    for (let i = 0; i < this.friendList.length; i++) {
      if (this.friendList[i].username.includes(key)) {
        friends.push(this.friendList[i]);
      }
    }
    this.listFriend = friends;
  }
}
