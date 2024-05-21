import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  

  constructor(
    private authService: AuthService,
    private router: Router

    ) {}

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Success!!')
        this.router.navigate(['/']);
      },
      error => {
        console.error('Noooooooo!!')
        this.errorMessage = 'Could not log in.'
      }
    )
  }
}
