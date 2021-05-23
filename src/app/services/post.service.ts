import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
// @ts-ignore
import {Post} from '../model/post';
import {Observable} from 'rxjs';
import {PostModel} from '../post/post-model';
import {PostPayload} from '../post/create-post/post.payload';
import { DUMMY_POST } from '../dummy-const';
import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  private dummyPost: PostModel[] = DUMMY_POST;

  private apiServerUrl = environment.apiBaseServer;

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<Array<PostModel>> {
    return of(this.dummyPost);
    // return this.http.get<Array<PostModel>>(`${this.apiServerUrl}/posts`);
  }

  createPost(postPayload: PostPayload): Observable<PostModel> {
    const dummyCreatedPost = Object.assign({}, this.dummyPost[0]);
    dummyCreatedPost.description = postPayload.description;
    return of(dummyCreatedPost);
    // return this.http.post<any>(`${this.apiServerUrl}/posts`, postPayload);
  }

  updatePost(postPayload: PostPayload): Observable<any> {
    return this.http.put(`${this.apiServerUrl}/posts/update`, postPayload);
  }


  getAllPostsByUserId(userId: number): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.apiServerUrl}/posts/by-user/` + userId);
  }

  deletePostById(postId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/posts/delete/` + postId);
  }
}




