import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbModule } from 'primeng/breadcrumb';

const PrimengModule = [
  MenubarModule,
  ButtonModule,
  InputTextModule,
  BreadcrumbModule
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
