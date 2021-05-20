import { User } from '../user/user';

export interface Post {
  postId?: number;
  description?: string;
  createDate?: Date;
  privacy?: number ;
  likeCount?: number;
  heartCount?: number ;
  User?: User;
}
