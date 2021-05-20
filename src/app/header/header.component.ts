import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;
  userId: number;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.userId.subscribe((data: number) => this.userId = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    this.userId = this.authService.getUserId();
  }

  goToUserProfile() {
    this.router.navigateByUrl('users/user-profile/' + this.userId);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

  public openModal(mode: string): void {
    const container = document.getElementById('main-container');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'chat'){
      button.setAttribute('data-target', '#ModalChat')
    }
    container?.appendChild(button);
    button.click();
  }
}

