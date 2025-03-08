import { Component, OnInit, Input } from '@angular/core';
import { Province } from 'src/app/data.interface';

@Component({
    selector: 'app-province',
    templateUrl: './province.component.html',
    styleUrls: ['./province.component.scss'],
    standalone: false
})
export class ProvinceComponent implements OnInit {

  @Input()  province: Province;
  @Input() displayH: boolean;

  constructor() { }

  ngOnInit() {
  }

}
