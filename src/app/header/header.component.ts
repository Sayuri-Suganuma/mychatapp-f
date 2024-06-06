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
  showUserName: boolean = true;
  userName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      //不要なページでは"logout"を表示させない設定。
      const isLoginOrSignIn = url.includes('/login') || url.includes('/sign-up');
      const isIndex = url === '/chatrooms';
      this.showBackButton = !isLoginOrSignIn && !isIndex;
      this.showUserName = !isLoginOrSignIn;
      this.showLogout = !isLoginOrSignIn;
    });

//現在のコードの実行が完了した後にgetUserInfoが呼び出される
  setTimeout(() => {
    const accessToken = localStorage.getItem('accessToken');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

  if (accessToken && client && uid) {
    this.authService.getUserInfo(accessToken, client, uid).subscribe(user => {
      const email = user.data.email;
      this.userName = this.extractUserName(email);
      console.log('userName:', this.userName);
    }, error => {
      console.error('Failed userName:', error);
    });
  }
  }, 0);
}

  private extractUserName(email: string): string {
    return email.split('@')[0]
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
        this.router.navigate(['/login']);
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
