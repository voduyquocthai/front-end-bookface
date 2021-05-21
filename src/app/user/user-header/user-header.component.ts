import {Component, Input, OnInit} from '@angular/core';
import {User} from '../User';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  @Input()user: User = {};
  @Input()check: boolean;
  id = -1;
  constructor(private localStorage: LocalStorageService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
      if (this.localStorage.retrieve('userId') === this.id){
        this.check = true;
      }
    });
  }

  ngOnInit(): void {
  }

}
