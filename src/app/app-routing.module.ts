import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { IndexComponent } from './index/index.component';
import { CreateChatroomComponent } from './create-chatroom/create-chatroom.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'sign-up', component: SignInComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: SignInComponent },
  { path: 'chatrooms', component: IndexComponent },
  { path: 'chatrooms/new', component: CreateChatroomComponent },
  { path: 'chatrooms/:id', component: ChatComponent },
  { path: '**', redirectTo: '/sign-up' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
