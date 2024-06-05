import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';
import { ChatroomService } from '../create-chatroom/chatroom.service';
import { ChangeDetectorRef } from '@angular/core';


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
  userId: string = '';
  senderId: string = '';
  content: any[] = [];
  userEmail: string = '';
  recipientId: string = '';
  senderEmail: string = '';
  


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private chatroomService: ChatroomService,
    private changeDetector: ChangeDetectorRef,
  ) { }

  // private apiUrl = 'http://localhost:3000/api/v1';
  private apiUrl = 'https://dev-sugaapp-be.sakuramobile.jp/api/v1';

  ngOnInit(): void {
    console.log("ChatComponent::ngOnInit start");
    this.route.paramMap.subscribe(params => {
      this.chatroomId = params.get('id');
      this.initializeChatroom();
    });

    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      this.message = JSON.parse(savedMessages);
    }

    const userEmail = localStorage.getItem('uid');
    if (userEmail) {
      this.userEmail = userEmail;
    }

    const recipientId = localStorage.getItem('userId');
    if (recipientId) {
      this.userId = recipientId
    }
  }


  initializeChatroom(): void {
    if (this.chatroomId) {
      this.chats = [];
      this.chatrooms = [];
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
          console.log("ChatComponent::initializeChatroom - got response");
          this.chatrooms = response;
          this.senderId = this.chatrooms.sender_id;
          this.ownerId = this.chatrooms.owner_id;
          this.partnerId = this.chatrooms.partner_id;
          this.title = this.chatrooms.title;
          this.sent_at = this.chatrooms.created_at;
          this.getChats(headers);
          console.log('chatroom:', headers);
        },
        (error: any) => {
          console.log('Error fetching chatroom details', error);
        }
      );
    }
  }


  getChats(headers: HttpHeaders): void {
    this.http.get(`${this.apiUrl}/chats?chatroom_id=${this.chatroomId}`, { headers }).subscribe(
      (response: any) => {
        console.log("ChatComponent::getChats - got response");
        this.chats = response;
        localStorage.setItem('chatMessages', JSON.stringify(this.chats));
        this.changeDetector.detectChanges();
      },
      (error: any) => {
        console.log('chats Error', error);
      }
    );
  }


  switchChatroom(newChatroomId: string): void {
    this.chats = [];
    localStorage.removeItem('chatMessages');

    this.chatroomId = newChatroomId;
    const accessToken = localStorage.getItem('access-token') || '';
    const client = localStorage.getItem('client') || '';
    const uid = localStorage.getItem('uid') || '';

    const headers = new HttpHeaders({
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    });

    this.getChats(headers);
  }


  sendMessage(): void {
    console.log('Preparing to send message:', this.messageContent, 'to chatroom:', this.chatroomId,);
    console.log('Sending message:', this.messageContent);

    const accessToken = localStorage.getItem('access-token') || '';
    const client = localStorage.getItem('client') || '';
    const uid = localStorage.getItem('uid') || '';
    const senderId = localStorage.getItem('userId') || '';
    const partnerId = localStorage.getItem('partner_id');
    const ownerId = localStorage.getItem('owner_id');
    const senderEmail = localStorage.getItem('uid')
    // const recipientId = localStorage.getItem('userId');
    // if (recipientId) {
    //   this.userId = recipientId
    // }
    console.log('senderEmail', senderEmail);

    const headers = new HttpHeaders({
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    });


    let receiverId;
    if (senderId === ownerId) {
      receiverId = partnerId;
    } else {
      receiverId = this.ownerId;
    }



    console.log('senderId:', senderId, 'ownerId:', this.ownerId, 'partnerId:', this.partnerId);
    console.log('Sender:', senderId, 'Recipient:', receiverId);


    const messageContent = this.message;

    const messageData = {
      chat: {
        content: this.messageContent,
        sender_id: senderId,
        chatroom_id: this.chatroomId,
        user_id: this.userId,
        receiver_id: receiverId,
        sent_at: new Date(),
        user_email: this.userEmail,
        sender_email: senderEmail,
      }
    };

  
    console.log('messageData:', messageData);

    this.http.post(`${this.apiUrl}/chats`, messageData, { headers }).subscribe(
      (response: any) => {
        this.chats.push(response);
        localStorage.setItem('chatMessages', JSON.stringify(this.message));
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

