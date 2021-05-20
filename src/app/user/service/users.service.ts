import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../User';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/user-profile/${id}`);
  }

  updateUserProfile(id: number, userUpdate: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/users/update-profile/${id}`, userUpdate);
  }

  getAllFriend(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users/list-friend/${id}`);
  }
}
