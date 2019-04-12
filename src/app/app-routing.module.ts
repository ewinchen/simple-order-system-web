import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main/main-layout/main-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginGuard } from './shared/guard/login.guard';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: './main/home/home.module#HomeModule',
        data: { menuName: 'Home' }
      },
      {
        path: 'order',
        loadChildren: './main/order/order.module#OrderModule',
        data: { menuName: 'Order' }
      },
      {
        path: 'report',
        loadChildren: './main/report/report.module#ReportModule',
        data: { menuName: 'Report' }
      },
      {
        path: 'setting',
        loadChildren: './main/setting/setting.module#SettingModule',
        data: { menuName: 'Setting' }
      },
      {
        path: 'system',
        loadChildren: './main/system/system.module#SystemModule',
        data: { menuName: 'System' }
      },

    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'not-found',
    loadChildren: './not-found/not-found.module#NotFoundModule'
  },
  {
    path: '**',
    loadChildren: './not-found/not-found.module#NotFoundModule'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
