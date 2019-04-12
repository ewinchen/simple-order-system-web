import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  items: MenuItem[] = [];
  home: MenuItem;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // 浏览器直接导航或刷新
    this.extract(this.route.snapshot);

    // 点击导航侧边栏，监测NavigationEnd事件来触发
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.items = [];
      this.extract(this.route.snapshot);
    });

  }

  extract(route: ActivatedRouteSnapshot) {
    const menuName = route.data.menuName;
    if (menuName && this.items.findIndex(item => item.label === menuName) === -1) {
      const menuItem: MenuItem = { label: menuName };
      this.items.push(menuItem);
    }
    // 递归子路由
    if (route.children) {
      route.children.forEach(item => {
        this.extract(item);
      });
    }
  }

}
