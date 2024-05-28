import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chats: any[] = [];
  ownerId: string = '';

  constructor(
    private chatService: ChatService, 
    private router: Router,
    private sharreService: SharedService,
    ) {}

  ngOnInit(): void {
    this.ownerId = this.sharreService.getOwnerId();
    
  }



}

