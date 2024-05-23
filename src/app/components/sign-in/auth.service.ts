// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000/api/v1'

  register(email: string, password: string) {
    return this.http.post<HttpResponse<any>>(`${this.baseUrl}/auth`, { email, password }, { observe: 'response' });
  }

  logout(accessToken: string, client: string, uid: string): Observable<any> {
    const headers = new HttpHeaders({
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    });
    return this.http.delete(`${this.baseUrl}/auth`, { headers: headers });
  }

  getCurrentUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  createChatroom(ownerId: string, partnerId: string, title: string): Observable<any> {
    const body = { user_id: ownerId, partnerId, title };
    return this.http.post<any>(this.baseUrl, body);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>('api/chatrooms');
  }
}
