import {User} from './User';

export class Friend {
  id?: string;
  sender?: User;
  receiver?: User;
  status?: boolean;
}
