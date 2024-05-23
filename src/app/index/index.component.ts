import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      console.log('Current user ID:', user.id); 
    });
  }

  create() {
    this.userService.getCurrentUser().subscribe(user => {
      this.router.navigate(['/chatrooms'], { queryParams: { userId: user.id } });
    });
  }
}
