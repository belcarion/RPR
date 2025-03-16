import { Component, OnInit, Input } from '@angular/core';
import { Senateur } from 'src/app/data.interface';

import { ProvinceComponent } from '../cartes/province/province.component';
import { ConcessionComponent } from '../cartes/concession/concession.component';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.scss'],
    imports: [ProvinceComponent, ConcessionComponent]
})
export class ForumComponent implements OnInit {
@Input() forum: Senateur[];

  constructor() { }

  ngOnInit() {
  }

}
