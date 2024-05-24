// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/api/v1'

  register(email: string, password: string) {
    return this.http.post<HttpResponse<any>>(`${this.apiUrl}/auth`, { email, password }, { observe: 'response' });
  }

  logout(accessToken: string, client: string, uid: string): Observable<any> {
    const headers = new HttpHeaders({
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    });
    return this.http.delete(`${this.apiUrl}/auth`, { headers: headers });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign_in`, { email, password });
  }

  registerChatroom(ownerId: string, partnerId: string): Observable<any> {
    const payload = { 'owner_id': ownerId, 'partner_id': partnerId };
    return this.http.post(`${this.apiUrl}/auth/chatrooms`, payload);
  }

}
