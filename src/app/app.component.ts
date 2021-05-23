import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'front-end-bookface';

  constructor(private authServie: AuthService,
              private router: Router,
              private stateService: StateService) {
  }

  /**
   * Check the JWT Token in Local Storage everytime client have access to the site. This method
   * is called once (if the user does not reload the website)
   */
  ngOnInit(): void {
    if (this.authServie.getJwtToken() != null) {
      this.stateService.userLoginObservable.next({
        username: this.authServie.getUserName(),
        userid: this.authServie.getUserId(),
      })
    } else {
      this.router.navigateByUrl('/login')
    }
  }

}
