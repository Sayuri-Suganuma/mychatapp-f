import { Component } from '@angular/core';
import { AuthService } from '../components/sign-in/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showBackButton: boolean = true;
  showLogout: boolean = true;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
    //不要なページでは"logout"を表示させない設定。
      // this.showBackButton = !(url.includes('/login') || url.includes('/sign-in') || url === '/index');
      // this.showLogout = !(url.includes('/login') || url.includes('/sign-in'));

    //簡潔に書いたコード
      const isLoginOrSignIn = url.includes('/login') || url.includes('/sign-in');
      const isIndex = url === '/index';
      this.showBackButton = !isLoginOrSignIn && !isIndex;
      this.showLogout = !isLoginOrSignIn;
    });
  }


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
