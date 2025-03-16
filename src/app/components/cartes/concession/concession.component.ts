import { Component, OnInit, input } from '@angular/core';
import { Concession } from 'src/app/data.interface';


@Component({
    selector: 'app-concession',
    templateUrl: './concession.component.html',
    styleUrls: ['./concession.component.scss'],
    imports: []
})
export class ConcessionComponent implements OnInit {

  readonly concessions = input<Concession[]>(undefined);
  readonly displayH = input<boolean>(undefined);

  constructor() { }

  ngOnInit() {

  }

}
