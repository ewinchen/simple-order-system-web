import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';

const PrimengModule = [
  MenubarModule,
  ButtonModule,
  InputTextModule,
  BreadcrumbModule,
  TableModule
];

@NgModule({
  declarations: [

  ],
  exports: [
    FormsModule,
    ...PrimengModule
  ],
})
export class SharedModule {
}
