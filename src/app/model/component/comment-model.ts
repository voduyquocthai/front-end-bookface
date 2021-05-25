import {User} from "../../user/user";

export interface CommentModel {
  id?: number;
  text?: string;
  postId?: number;
  userId?: number;
  username?: string;
  userAvatar?: string;
}
