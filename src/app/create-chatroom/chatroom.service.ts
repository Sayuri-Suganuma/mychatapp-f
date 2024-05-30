import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  private baseUrl = 'http://localhost:3000/api/v1/chatrooms';


  constructor(
    private http: HttpClient,
    ) { }


  createChatroom(ownerId: string, partnerId: string, title: string) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const chatroomData = {
      "chatroom": {
        "owner_id": ownerId,
        "partner_id": partnerId,
        "title": title,
      }
    };

    return this.http.post(this.baseUrl, chatroomData, { headers });
  }

}

