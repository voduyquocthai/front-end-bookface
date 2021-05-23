import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-header-container',
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.css']
})
export class HeaderContainerComponent implements OnInit {

  @Input()
  guestBrowsing: boolean = true;

  @Input()
  username: string;

  @Input()
  userId: string;

  constructor() {}

  ngOnInit(): void {
  }

}
