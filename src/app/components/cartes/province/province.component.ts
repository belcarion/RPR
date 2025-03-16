import { Component, OnInit, Input, input } from '@angular/core';
import { Province } from 'src/app/data.interface';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-province',
    templateUrl: './province.component.html',
    styleUrls: ['./province.component.scss'],
    imports: [NgClass]
})
export class ProvinceComponent implements OnInit {

  // TODO: Skipped for migration because:
  //  This input is used in a control flow expression (e.g. `@if` or `*ngIf`)
  //  and migrating would break narrowing currently.
  @Input()  province: Province;
  readonly displayH = input<boolean>(undefined);

  constructor() { }

  ngOnInit() {
  }

}
