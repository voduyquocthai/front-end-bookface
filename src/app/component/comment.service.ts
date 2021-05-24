import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentPayload} from "./comment-payload";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

 private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllComment(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comments`)
  }

  getAllCommentForPost(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comments/by-post/`+ postId)
  }

  getAllCommentForUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comments/by-user/` + userId)
  }
  createComment(commentPayload: CommentPayload): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comments/create`, commentPayload)
  }

  updateComment(commentPayload: CommentPayload): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/comments/update`, commentPayload)
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/comments/delete/` + commentId)
  }
}
