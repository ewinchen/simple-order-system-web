import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-snapshot',
  templateUrl: './user-snapshot.component.html',
  styleUrls: ['./user-snapshot.component.scss']
})
export class UserSnapshotComponent implements OnInit {


  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
