import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {UsersService} from '../service/users.service';
import {ActivatedRoute} from '@angular/router';
import {parse} from '@angular/compiler/src/render3/view/style_parser';
import {Friend} from '../Friend';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id = -1;
  friendShip: Friend;
  user: User = {};
  listFriend: User[] = [];

  constructor(private userService: UsersService,
              private activatedRoute: ActivatedRoute,
              private localStorage: LocalStorageService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.getUser(this.id);
      this.getAllFriend(this.id);
    });
  }

  ngOnInit(): void {
    this.getFriendByDoubleId();
  }

    getFriendByDoubleId() {
    let senderId = this.localStorage.retrieve('userId');
    let receiverId = this.id;
    this.userService.getFriendByDoubleId(senderId, receiverId).subscribe(value => {
      console.log(value);
       this.friendShip = value;
    })
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
    }
    console.log(this.friendShip, 'friendship')

    this.userService.addFriendInFriendsUser(this.friendShip).subscribe(value => {
      this.friendShip = value;
    })
  }

  unFriend() {
    if(this.user.userId == this.friendShip.sender.userId) {

    }
    console.log(this.friendShip, 'frienship');
      this.userService.unFriend(this.friendShip.id).subscribe(value => {
        console.log(value, 'res');
        this.friendShip = value;
      })
  }

  accept() {
    this.userService.accept(this.friendShip).subscribe(value => {
      this.friendShip = value;
    });
  }

  xuly( ) {
    if (this.friendShip || this.friendShip && this.friendShip.status == true) {
      this.unFriend()
    }
    // else if(this.friendShip || this.friendShip && this.friendShip.status == false ){
    //   this.unFriend()
    // }
    else {
      this.addFriend()
    }
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe(user => {
      this.user = user;
    });
  }

  getAllFriend(id: number) {
    this.userService.getAllFriend(id).subscribe(users => {
      this.listFriend = users;
    });
  }

}
