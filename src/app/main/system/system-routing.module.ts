import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';

const routes: Routes = [
  {
    path: 'authorization',
    component: AuthorizationComponent,
    data: { pageTitle: 'Authorization' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
