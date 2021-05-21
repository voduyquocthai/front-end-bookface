import {User} from './user';

export class Friend {
  id?: string;
  sender?: User;
  receiver?: User;
  status?: boolean;

  constructor() {
  }
}
