import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'mychatapp';
  chatrooms: any;
  chats: any[] = [];

  constructor(private httpClient: HttpClient) { }

  // public async getMessageContent(id: string): Promise<void> {
  //   const url = `http://localhost:3000/api/v1/chatrooms/${id}`;
  //   try {
  //     this.chatrooms = await lastValueFrom(this.httpClient.get(url));
  //   } catch (error) {
  //     console.error('Error fetching chatroom content:', error);
  //   }
  // }

  public async getMessageContent(id: string): Promise<void> {
    const url = `http://dev-sugaapp-be.sakuramobile.jp/api/v1/${id}`;
    try {
      this.chatrooms = await lastValueFrom(this.httpClient.get(url));
    } catch (error) {
      console.error('Error fetching chatroom content:', error);
    }
  }


  // public async postChatContent(id:string): Promise<void>{
  //   const url = `http://localhost:3000/api/v1/chatrooms/${id}`;
  //   try {
  //     this.chatrooms = await lastValueFrom(this.httpClient.get(url));
  //   } catch (error) {
  //     console.error('Error fetching chatroom content:', error)
  //   }
  // }


  public async postChatContent(id:string): Promise<void>{
    const url = `http://dev-sugaapp-be.sakuramobile.jp/api/v1/chatrooms/${id}`;
    try {
      this.chatrooms = await lastValueFrom(this.httpClient.get(url));
    } catch (error) {
      console.error('Error fetching chatroom content:', error)
    }
  }
}
