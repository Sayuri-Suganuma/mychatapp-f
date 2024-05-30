import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages: any[] = [];


  constructor() {
    this.messages = this.loadMessagesFromLocalStorage();
  }

  getMessages(): any[] {
    return this.messages;
  }

  addMessage(message: any): void {
    this.messages.push(message);
    this.saveMessagesToLocalStorage();
  }

  private saveMessagesToLocalStorage(): void {
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }

  private loadMessagesFromLocalStorage(): any[] {
    const messages = localStorage.getItem('messages');
    return messages ? JSON.parse(messages) : [];
  }

}
