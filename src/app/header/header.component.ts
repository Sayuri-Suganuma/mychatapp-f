import { Component } from '@angular/core';
import { AuthService } from '../components/sign-in/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router
    ) {}


  logout() {
    console.log('logout clicked');
    const accessToken = localStorage.getItem('accessToken');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    if (accessToken && client && uid) {
      console.log('OK');

      this.authService.logout(accessToken, client, uid).subscribe({
        
      next: () => {
        console.log('Success!!')
        localStorage.removeItem('accessToken');
        localStorage.removeItem('client');
        localStorage.removeItem('uid');
        this.router.navigate(['sign-in']);
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Could not logout.';
      }
    })
  } else {
    console.log('NO');
  }
}

}
