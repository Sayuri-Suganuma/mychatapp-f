import { Component } from '@angular/core';
import { AuthService } from '../components/sign-in/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage = '';
  userId: string = '';
  post_res: any = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}



    login() {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log(response.body);
          const user = response.body.user;
          const userId = user.id;
          const accessToken = response.headers.get('access-token');
          const client = response.headers.get('client');
          const uid = response.headers.get('uid');
    
          if (user && accessToken && client && uid) {
            console.log('OK??')
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('client', client);
            localStorage.setItem('uid', uid);
            localStorage.setItem('userId', userId);
  
            console.log('Login successful, userId:', userId);
            this.router.navigate(['/']);
          } else {
  
            console.error('Login failed');
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
