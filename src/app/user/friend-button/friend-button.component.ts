import {Component, Input, OnInit} from '@angular/core';
import {Friend} from '../Friend';
import {User} from '../user';
import {UsersService} from '../service/users.service';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-friend-button',
  templateUrl: './friend-button.component.html',
  styleUrls: ['./friend-button.component.css']
})
export class FriendButtonComponent implements OnInit {
  friendShip: Friend;
  @Input() user: User = {};
  @Input() id = -1;

  constructor(private userService: UsersService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.getFriendShip(this.id);
  }

  addFriend() {
    this.friendShip = new Friend();
    this.friendShip = {
      sender: {
        userId: this.localStorage.retrieve('userId')
      },
      receiver: {
        userId: this.id
      },
      status: false
    };
    this.userService.addFriendInFriendsUser(this.friendShip).subscribe(value => {
      this.friendShip = value;
    });
  }

  getFriendShip(id: number) {
    const currentUserId = this.localStorage.retrieve('userId');
    this.userService.getFriendByDoubleId(this.id, currentUserId).subscribe(friend => {
      this.friendShip = friend;
    })
  }

  unFriend() {
    this.getFriendShip(this.id);
    this.userService.unFriend(this.friendShip.id).subscribe(value => {
      console.log(value, 'res');
      // this.friendShip = value;
    });
    document.getElementById("close-add-friend-modal").click();
  }

  accept() {
    this.getFriendShip(this.id);
    this.userService.accept(this.friendShip).subscribe(value => {
      this.friendShip = value;
    });
  }

  openModal(mode: string) {
    const container = document.getElementById('friend');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'decline'){
      button.setAttribute('data-bs-target', '#decline');
    }
    if (mode === 'unfriend'){
      button.setAttribute('data-bs-target', '#unfriend');
    }

    container.appendChild(button);
    button.click();
  }
}
