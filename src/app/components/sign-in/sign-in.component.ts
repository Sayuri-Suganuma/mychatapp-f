import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage = '';
  

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    
  }

  register() {
    this.authService.register(this.email, this.password).subscribe({
      next: (response) => {
        const headers = response.headers;
        const accessToken = headers.get('access-token');
        const client = headers.get('client');
        const uid = headers.get('uid');

        if (accessToken && client && uid) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('client', client);
          localStorage.setItem('uid', uid);
          console.log('Success!!');
          this.router.navigate(['/']);
        } else {
          console.error('No token data');
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
