import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  template: `
    <span (click)="showPopup()">
      <a class="btn" title="Sign Out">
        <i class="fa fa-sign-out"></i>
      </a>
    </span>
  `,
  styles: [`
    a {
      color: white;
    }
    a:hover {
      color: white
    }
  `]
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService) { }

  showPopup() {
    if (confirm('Sign out your sessioin?')) {
      this.authService.logout();
    }
  }

  ngOnInit() {

  }



}
