import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Friend} from '../Friend';
import {User} from '../user';


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

  getFriendByDoubleId(senderId: string, receiverId: number): Observable<Friend> {
    return this.http.get(`${API_URL}/friend/search/${senderId}/${receiverId}`);
  }

  addFriendInFriendsUser(friendShip: Friend): Observable<Friend> {
    return this.http.post<Friend>(`${API_URL}/friend/add-waiting`, friendShip);
  }

  getAllFriend(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users/list-friend/${id}`);
  }

  unFriend(id: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/friend/unfriend/${id}`);
  }

  accept(friendShip: Friend): Observable<Friend> {
    return this.http.post<Friend>(`${API_URL}/friend/add-accept`, friendShip);
  }

  getAllUserActivated(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/admin/user-activated')
  }

  getAllUserBlocked(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/admin/user-blocked')
  }

  blockAUser(id: string): Observable<User[]> {
    return this.http.get<User[]>(API_URL + `/admin/user-block/${id}`)
  }

  unBlockAUser(id: string): Observable<User> {
    return this.http.get(API_URL + `/admin/unblock/${id}`)
  }
}
