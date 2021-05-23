import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  //This subject has a buffer which replay the existing value until there is a new value emit
  //https://www.learnrxjs.io/learn-rxjs/subjects/replaysubject
  userLoginObservable: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor() {
  }

}
