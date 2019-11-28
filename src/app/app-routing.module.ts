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
        loadChildren: () => import('./main/home/home.module').then(m => m.HomeModule),
        data: { menuName: 'Home' }
      },
      {
        path: 'order',
        loadChildren: () => import('./main/order/order.module').then(m => m.OrderModule),
        data: { menuName: 'Order' }
      },
      {
        path: 'report',
        loadChildren: () => import('./main/report/report.module').then(m => m.ReportModule),
        data: { menuName: 'Report' }
      },
      {
        path: 'setting',
        loadChildren: () => import('./main/setting/setting.module').then(m => m.SettingModule),
        data: { menuName: 'Setting' }
      },
      {
        path: 'system',
        loadChildren: () => import('./main/system/system.module').then(m => m.SystemModule),
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
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
