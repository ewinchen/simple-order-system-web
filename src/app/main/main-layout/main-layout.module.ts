import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthModule } from '../../auth/auth.module';
import { MenuComponent } from './menu/menu.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { UserSnapshotComponent } from './user-snapshot/user-snapshot.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    SharedModule,

  ],
  declarations: [
    MainLayoutComponent,
    MenuComponent,
    BreadcrumbComponent,
    UserSnapshotComponent,
  ],
  exports: [
  ]
})
export class MainLayoutModule {

}
