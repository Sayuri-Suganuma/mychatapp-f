// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserId: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

  // private apiUrl = 'http://localhost:3000/api/v1';
  private apiUrl = 'https://dev-sugaapp-be.sakuramobile.jp/api/v1';

  register(email: string, password: string): Observable<any> {
    const payload = {
      user: { email: email, password: password }
    };
    return this.http.post(`${this.apiUrl}/auth`, payload, { observe: 'response' });
  }

  getUserInfo(accessToken: string, client: string, uid: string): Observable<any> {
    const headers = new HttpHeaders({
      'access-token': accessToken,
      'client': client,
      'uid': uid
    });

    return this.http.get(`${this.apiUrl}/auth/validate_token`, { headers });
  }

  logout(accessToken: string, client: string, uid: string): Observable<any> {
    const headers = new HttpHeaders({
      'access-token': accessToken,
      'client': client,
      'uid': uid,

    });
    return this.http.delete(`${this.apiUrl}/auth/sign_out`, { headers: headers }).pipe(
      tap(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('client');
        localStorage.removeItem('uid');
        localStorage.removeItem('userId');
        console.log('Logged out and local storage cleared.');

        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.error('Logout failed:', error);
        return throwError(() => error)
      })
    )
  }

  login(email: string, password: string): Observable<any> {
    const payload = {
      user: { email: email, password: password }
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<HttpResponse<any>>(
      `${this.apiUrl}/auth/sign_in`,
      payload,
      { headers: headers, observe: 'response' }
    );
  }

}

