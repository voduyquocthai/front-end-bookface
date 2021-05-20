import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
// @ts-ignore
import {Post} from '../model/post';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {
  }

  getAllPost(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(API_URL + '/posts');
  }

  createStatusPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(API_URL + '/posts/create', post);
  }

  editStatusPost(id: number, post: Post): Observable<any> {
    return this.httpClient.put<any>(`${API_URL}/posts/update`, post);
  }

  findPostById(id: Post[]): Observable<Post> {
    return this.httpClient.get<Post>(`${API_URL}/posts/find/${id}`);
  }

  deletePostById(id: number): Observable<Post> {
    return this.httpClient.delete<Post>(`${API_URL}/posts//delete/${id}`);
  }

}
