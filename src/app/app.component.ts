import { Component, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService
  ) { }
}
