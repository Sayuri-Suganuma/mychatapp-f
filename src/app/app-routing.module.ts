import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { IndexComponent } from './index/index.component';
import { CreateChatroomComponent } from './create-chatroom/create-chatroom.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'sign-in', component: SignInComponent},
  { path: 'chatrooms', component: CreateChatroomComponent},
  { path: 'chats', component: ChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
