import {Component, Input, OnInit} from '@angular/core';
import {UsersService} from '../service/users.service';
import {User} from '../user';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-mutual-friend',
  templateUrl: './mutual-friend.component.html',
  styleUrls: ['./mutual-friend.component.css']
})
export class MutualFriendComponent implements OnInit {
  mutualFriend: User[] = [];
  @Input() userId = -1;
  constructor(private userService: UsersService,
              private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    const currentUser = this.localStorage.retrieve('userId');
    this.getAllMutualFriends(this.userId, currentUser);
  }

  getAllMutualFriends(id1: number, id2: number) {
    this.userService.getMutualFriends(id1, id2).subscribe(users => {
      this.mutualFriend = users;
    });
  }
}
