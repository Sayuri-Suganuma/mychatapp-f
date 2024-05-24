import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {}

  getChatByOwnerId(ownerId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/v1/chatrooms/${ownerId}/chats`);
  }
}
