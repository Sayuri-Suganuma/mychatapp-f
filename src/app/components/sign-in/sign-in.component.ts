import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SharedService } from 'src/app/shared.service';
import { tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage = '';
  userId: string = '';
  post_res: any = '';
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private http: HttpClient
    ) {}

    ngOnInit(): void {
    }

  register() {
    this.authService.register(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Full Response:', response);
        console.log(response.body);
        const userData = response.body.data;
        const userId = userData.id;
        const headers = response.headers;
        const accessToken = headers.get('access-token');
        const client = headers.get('client');
        const uid = headers.get('uid');
        console.log('userId:', userId);

        if (accessToken && client && uid) {
          this.post_res = response;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('client', client);
          localStorage.setItem('uid', uid);
          console.log('Success!!');

          localStorage.setItem('userId', userId.toString());

          this.router.navigate(['/index']);

        } else {
          console.error('No token data!!!');
          this.errorMessage = 'Could not log in.';
        }
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Could not log in.';
      }
    });
  }
  
}
