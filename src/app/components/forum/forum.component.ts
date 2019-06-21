import { Component, OnInit, Input } from '@angular/core';
import { Carte } from 'src/app/data.interface';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
@Input() forum: Carte[];

  constructor() { }

  ngOnInit() {
  }

}
