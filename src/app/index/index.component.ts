import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatroomService } from '../create-chatroom/chatroom.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  chatrooms: any[] = [];
  userId: string = '';
  chats: any[] = [];



  // private apiUrl = 'http://localhost:3000/api/v1';
  private apiUrl = 'https://dev-sugaapp-be.sakuramobile.jp/api/v1';

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private chatroomService: ChatroomService,
  ) { }


  ngOnInit(): void {
    this.chatrooms = [];
    this.loadChatrooms();
  }


  loadChatrooms() {
    const accessToken = localStorage.getItem('access-token') || '';
    const client = localStorage.getItem('client') || '';
    const uid = localStorage.getItem('uid') || '';
    const userId = localStorage.getItem('userId') || '';

    console.log('userId', userId)
    console.log('uid', uid)
    console.log('client', client)
    console.log('access-token', accessToken)

    const headers = new HttpHeaders({
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    });

    this.userService.getChatroomsForUser(this.userId, headers).subscribe(
      (chatrooms: any) => {
        this.chatrooms = chatrooms;
        console.log('chatrooms:', this.chatrooms);
        console.log('Loaded chatrooms:', this.chatrooms);
      },
      (error: any) => {
        console.error('Error chatrooms', error);
      }
    );

  }

  // getChatroomsForUser(userId: string, headers: HttpHeaders): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/chatrooms?user_id=${userId}`, { headers });
  //           this.router.navigate(['/chatrooms']);
  // }

}
