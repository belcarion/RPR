import { Component, OnInit, Input } from '@angular/core';
import { Concession } from 'src/app/data.interface';

@Component({
    selector: 'app-concession',
    templateUrl: './concession.component.html',
    styleUrls: ['./concession.component.scss'],
    standalone: false
})
export class ConcessionComponent implements OnInit {

  @Input() concessions: Concession[];
  @Input() displayH: boolean;

  constructor() { }

  ngOnInit() {

  }

}
