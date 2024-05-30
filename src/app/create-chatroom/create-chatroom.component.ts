import { Component, OnInit } from '@angular/core';
import { AuthService } from '../components/sign-in/auth.service';
import { ChatroomService } from './chatroom.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { HttpHeaders } from '@angular/common/http';

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
  userId: string = '';
  chatroom_id: string = '';

  constructor(
    private authService: AuthService,
    private chatroomService: ChatroomService,
    private router: Router,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {

    // const accessToken = localStorage.getItem('accessToken');
    // const client = localStorage.getItem('client');
    // const uid = localStorage.getItem('uid');

    // const headers  = {
    //   'access-token': accessToken,
    //   'client': client,
    //   'uid': uid
    // };
    // this.authService.fetchCurrentUser().subscribe({
    //   next: (response) => {
    //     const userId = response['data'].user.id;
    //     this.ownerId = userId;
    //   },
    //   error: (error) => {
    //     console.error('current user: Error :', error);
    //   }
    // });
  }


  chatroom() {
    console.log('click');
    if (this.partnerId && this.title) {
      console.log('Ok');

      const userId = localStorage.getItem('userId') || '';
      this.ownerId = userId;

      this.chatroomService.createChatroom(this.ownerId, this.partnerId, this.title).subscribe({
        next: (response) => {
          this.post_res = response;
          console.log('Chatroom created:', this.post_res["owner_id"]);
          console.log('Chatroom created:', this.post_res["id"]);
          console.log('userId', this.userId);

          localStorage.setItem('chatroom_id', this.post_res["id"]);
          localStorage.setItem('owner_id', this.post_res["owner_id"]);
          localStorage.setItem('partner_id', this.post_res["partner_id"]);
          localStorage.setItem('title', this.post_res["title"]);

          this.router.navigate(['/chat', this.post_res["id"]]);

          this.sharedService.setOwnerId(this.post_res["owner_id"]);

          this.chatroom_id = this.post_res["id"];
          console.log('chatroom_id', this.chatroom_id)
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