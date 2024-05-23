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
  currentUserId: string = '';

  constructor(
    private authService: AuthService,
    private chatroomService: ChatroomService,
    private router: Router,
    ) {}


  ngOnInit(): void {
    // this.authService.getCurrentUserId().subscribe({
    //   next: (userId: string) => {
    //     this.currentUserId = userId;
    //     console.log('current User ID', userId);
    //   },
    //   error: (error: any) => { 
    //     console.error('not find', error);
    //   }
    // });
  }

  chatroom() {
    console.log('click');
    const ownerId = this.authService.getCurrentUserId();
    const partnerId = 'example_partner_id';
    const title = 'example_title';

    if (ownerId && partnerId && title) {
      console.log('OK');
      localStorage.setItem('owner_id', ownerId);
      localStorage.setItem('partner_id', partnerId);
      localStorage.setItem('title', title);

      this.chatroomService.createChatroom(ownerId, partnerId, title).subscribe(
        (response: any) => {
          console.log('create!!', response);
          this.router.navigate(['/chat']);
        },
        (error: any) => {
          console.error('Error', error);
        }
    )
    } else {
      console.log('NO');
    }
}

}
