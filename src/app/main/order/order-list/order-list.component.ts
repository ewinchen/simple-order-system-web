import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  cars: any[];

  cols: any[];

  constructor() { }

  ngOnInit() {

    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];

    this.cars = [
      { vin: '1', year: '2', brand: '3', color: '4' },
      { vin: '1', year: '2', brand: '3', color: '4' },
      { vin: '1', year: '2', brand: '3', color: '4' },
      { vin: '1', year: '2', brand: '3', color: '4' },
      { vin: '1', year: '2', brand: '3', color: '4' },
      { vin: '1', year: '2', brand: '3', color: '4' },
      { vin: '1', year: '2', brand: '3', color: '4' },
    ]
  }

}
