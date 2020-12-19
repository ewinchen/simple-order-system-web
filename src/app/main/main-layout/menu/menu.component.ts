import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home', routerLink: ['/home']
      },
      {
        label: 'Order', routerLink: ['/order']
      },
      {
        label: 'Setting', items: [{ label: 'Customer', routerLink: ['/setting/customer'] }]
      },
      {
        label: 'System', routerLink: ['/system']
      },
      {
        label: 'System', routerLink: ['/system']
      },
      {
        label: 'System', routerLink: ['/system']
      },
      {
        label: 'System', routerLink: ['/system']
      },
      {
        label: 'System', routerLink: ['/system']
      },
      {
        label: 'System', routerLink: ['/system']
      },
      {
        label: 'System', routerLink: ['/system']
      },
      {
        label: 'System', routerLink: ['/system']
      },
      {
        label: 'System', routerLink: ['/system']
      },
      {
        label: 'System', routerLink: ['/system']
      },
      {
        label: 'System', routerLink: ['/system']
      },

    ];
  }

}
