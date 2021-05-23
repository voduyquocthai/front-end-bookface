import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  userLoginObservable: Subject<any> = new Subject();

  constructor() {
  }

}
