import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chats: any[] = [];
  ownerId: string = '';
  message: any[] = [];
  messageContent: string = '';
  chatroomId: any = '';
  post_res: any;
  chatroom_id: any = '';
  chatrooms: any = '';
  partnerId: string = '';
  title: string = '';
  sent_at: any = '';
  userId: any = '';
  senderId: any = '';
  content: any[] = [];


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) { }

  private apiUrl = 'http://localhost:3000/api/v1'

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.chatroomId = params.get('id');

      if (this.chatroomId) {
        const accessToken = localStorage.getItem('access-token') || '';
        const client = localStorage.getItem('client') || '';
        const uid = localStorage.getItem('uid') || '';

        const headers = new HttpHeaders({
          'access-token': accessToken,
          'client': client,
          'uid': uid,
        });

        this.http.get(`${this.apiUrl}/chatrooms/${this.chatroomId}`, { headers }).subscribe(
          (response: any) => {
            this.chatrooms = response;
            this.senderId = this.chatrooms.sender_id;
            this.ownerId = this.chatrooms.owner_id;
            this.partnerId = this.chatrooms.partner_id;
            this.title = this.chatrooms.title;
            this.sent_at = this.chatrooms.created_at;
            console.log('title', this.chatrooms.title)
          },
          (error: any) => {
            console.log('Error fetching chatroom details', error);
          }
        );
      }
    });
  }


  sendMessage(): void {
    console.log('Preparing to send message:', this.messageContent, 'to chatroom:', this.chatroomId,);
    console.log('Sending message:', this.messageContent);

    // const senderId = this.senderId;
    // console.log('senderId:', senderId, 'ownerId:', this.ownerId, 'partnerId:', this.partnerId);

    const accessToken = localStorage.getItem('access-token') || '';
    const client = localStorage.getItem('client') || '';
    const uid = localStorage.getItem('uid') || '';
    const senderId = localStorage.getItem('userId');
    // const partnerId = localStorage.getItem('partner_id');

    console.log('senderId:', senderId);


    const headers = new HttpHeaders({
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    });

    // const userId = senderId === this.ownerId ? this.partnerId : this.ownerId;

    let userId;
    if (senderId === this.ownerId) {
      userId = this.partnerId;
      console.log('userId set to partnerId:', userId);
    } else {
      userId = this.ownerId;
      console.log('userId set to ownerId:', userId);
    }


    const messageContent = this.message;

    const messageData = {
      chat: {
        content: this.messageContent,
        sender_id: senderId,
        chatroom_id: this.chatroomId,
        user_id: userId,
        sent_at: new Date(),
      }
    };


    console.log('messageData:', messageData);

    this.http.post(`${this.apiUrl}/chats`, messageData, { headers }).subscribe(
      (response: any) => {
        this.message.push(response);
        console.log('title', this.chatrooms.title)
        console.log('this.message', this.message);
        console.log('messageContent', messageContent);
      },
      (error: any) => {
        console.log('chats error', error);
        console.log('Loaded chatrooms:', this.chatrooms);
      }

    );
    this.messageContent = '';
    console.log('Message sent');
  }
}

