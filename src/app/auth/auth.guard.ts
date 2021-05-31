import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private  authService: AuthService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (this.authService.getRoleUser() == 'ROLE_ADMIN') {
      return true;
    }else {
      this.router.navigate(['']).then(r => '/')
      return false;
    }
  }


}
