import { LoginResponse } from "./auth/login/login.response.payload";
import { PostModel } from "./post/post-model";

export const DUMMY_POST: PostModel[] = [
  {
    id: 1,
    description: "1",
    userName: "namct",
    likeCount: 100,
    heartCount: 100,
    commentCount: 100,
    userAvatar: "https://www.w3schools.com/w3css/img_lights.jpg",
    duration: "?",
    liked: true,
    hearted: true,
  }
]

export const DUMMY_USER: LoginResponse = {
  username: "namct",
  userId: 1,
  authenticationToken:"123456",
  expiresAt: new Date(),
}
