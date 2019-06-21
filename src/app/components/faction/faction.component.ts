import { Component, OnInit, Input } from '@angular/core';
import { Senateur, Faction } from 'src/app/data.interface';
import { FactionService } from 'src/app/services/faction.service';

@Component({
  selector: 'app-faction',
  templateUrl: './faction.component.html',
  styleUrls: ['./faction.component.scss']
})
export class FactionComponent implements OnInit {

  @Input() faction: Faction;
  public tresor = 0;
  public influence = 0;

  constructor(private factionService: FactionService) { }

  ngOnInit() {
  }

}
