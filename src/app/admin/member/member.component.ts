import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../user/user';
import {UsersService} from '../../user/service/users.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {


  // @Input() userActivated: User;
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  // blockAUser() {
  //   return this.userService.blockAUser(this.userActivated.userId).subscribe(value => {
  //
  //   })
  // }

}
