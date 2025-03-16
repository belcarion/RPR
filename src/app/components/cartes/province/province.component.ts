import { Component, OnInit, Input } from '@angular/core';
import { Province } from 'src/app/data.interface';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-province',
    templateUrl: './province.component.html',
    styleUrls: ['./province.component.scss'],
    imports: [NgClass]
})
export class ProvinceComponent implements OnInit {

  @Input()  province: Province;
  @Input() displayH: boolean;

  constructor() { }

  ngOnInit() {
  }

}
