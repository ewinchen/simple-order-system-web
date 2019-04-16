import { Component, OnInit } from '@angular/core';
import { MainLayoutService } from './main-layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  isBlock: boolean;

  constructor(private mainLayoutService: MainLayoutService) {
    mainLayoutService.isBlock$.subscribe(res => this.isBlock = res);
  }

  ngOnInit() {
  }


}
