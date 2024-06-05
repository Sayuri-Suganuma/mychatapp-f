import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { IndexComponent } from './index/index.component';
import { CreateChatroomComponent } from './create-chatroom/create-chatroom.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: '', component: SignInComponent },
  { path: 'chatrooms', component: CreateChatroomComponent },
  { path: 'chatrooms/:id', component: CreateChatroomComponent },
  { path: 'chats', component: ChatComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
