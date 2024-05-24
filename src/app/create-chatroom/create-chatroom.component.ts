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

  constructor(
    private authService: AuthService,
    private chatroomService: ChatroomService,
    private router: Router,
    ) {}


  ngOnInit(): void {}

  chatroom() {
    console.log('click');
  
    if (this.ownerId && this.partnerId && this.title) {
      console.log('Ok');
      this.chatroomService.createChatroom(this.ownerId, this.partnerId, this.title).subscribe({
        next: (response) => {
          console.log('Chatroom created:', response);
          localStorage.setItem('owner_id', this.ownerId);
          localStorage.setItem('partner_id', this.partnerId);
          localStorage.setItem('title', this.title);
          this.router.navigate(['/chat']);
        },
        error: (error) => {
          console.error('Error creating chatroom:', error);
        }
      });
    } else {
      console.log('No');
    }
  }

} 
