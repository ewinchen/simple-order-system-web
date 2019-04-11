import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InquiryComponent } from './inquiry/inquiry.component';

const routes: Routes = [
  {
    path: 'inquiry',
    component: InquiryComponent,
    data: { menuName: 'Inquiry' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
