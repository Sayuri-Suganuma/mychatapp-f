import { Component, OnInit } from '@angular/core';
import { AuthService } from '../components/sign-in/auth.service';
import { ChatroomService } from './chatroom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-chatroom',
  templateUrl: './create-chatroom.component.html',
  styleUrls: ['./create-chatroom.component.css']
})
export class CreateChatroomComponent implements OnInit {
  ownerId: string = '';
  partnerId: string = '';
  title: string = '';
  post_res: any = '';

  constructor(
    private authService: AuthService,
    private chatroomService: ChatroomService,
    private router: Router,
  ) { 
  }


  ngOnInit(): void { }

  

  chatroom() {
    console.log('click');
    if (this.partnerId && this.title) {
      console.log('Ok');
      this.chatroomService.createChatroom(this.ownerId, this.partnerId, this.title).subscribe({
        next: (response) => {
          this.post_res = response;
          console.log('Chatroom created:', this.post_res);
          console.log('Chatroom created:', this.post_res["owner_id"]);
          localStorage.setItem('owner_id', this.post_res["owner_id"]);
          localStorage.setItem('partner_id', this.partnerId);
          localStorage.setItem('title', this.title);
          this.router.navigate(['/chats']);
        },
        error: (error) => {
          console.error('Error creating chatroom:', error);
        }
      });
    } else {
      console.log('PartnerId or title is missing');
    }
  }
}