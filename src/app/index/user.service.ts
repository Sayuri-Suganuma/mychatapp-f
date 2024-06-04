// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private apiUrl = 'http://localhost:3000/api/v1';
  private apiUrl = 'https://dev-sugaapp-fe.sakuramobile.jp/api/v1';

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    const userId = localStorage.getItem('userId');
    const headers = new HttpHeaders({
      'access-token': localStorage.getItem('access-token') || '',
      'client': localStorage.getItem('client') || '',
      'uid': localStorage.getItem('uid') || ''
    });
    return this.http.get(`${this.apiUrl}/chatrooms?user_id=${userId}`, { headers });
  }

  getChatroomsForUser(userId: string, headers: HttpHeaders): Observable<any> {
    return this.http.get(`${this.apiUrl}/chatrooms?user_id=${userId}`, { headers });
  }

}
