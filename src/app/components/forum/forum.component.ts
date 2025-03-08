import { Component, OnInit, Input } from '@angular/core';
import { Senateur } from 'src/app/data.interface';

@Component({
    selector: 'app-forum',
    templateUrl: './forum.component.html',
    styleUrls: ['./forum.component.scss'],
    standalone: false
})
export class ForumComponent implements OnInit {
@Input() forum: Senateur[];

  constructor() { }

  ngOnInit() {
  }

}
