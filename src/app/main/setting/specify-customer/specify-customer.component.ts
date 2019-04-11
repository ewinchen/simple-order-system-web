import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-specify-customer',
  templateUrl: './specify-customer.component.html',
  styleUrls: ['./specify-customer.component.css']
})
export class SpecifyCustomerComponent implements OnInit {

  selectedCustomers: Array<any> = [];

  constructor(
  ) { }

  ngOnInit() {
  }


}
