import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';

const PrimengModule = [
  MenubarModule,
  ButtonModule,
  InputTextModule,
  BreadcrumbModule,
  TableModule,
  BlockUIModule,
  ProgressSpinnerModule,
  SplitButtonModule,
  MenuModule,
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
