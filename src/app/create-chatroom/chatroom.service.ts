
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  private baseUrl = 'http://localhost:3000/api/v1/chatrooms';

  constructor(private http: HttpClient) { }

  createChatroom(userId: string, name: string, description: string): Observable<any> {
    const body = { user_id: userId, name, description };
    return this.http.post<any>(this.baseUrl, body);
  }
}
