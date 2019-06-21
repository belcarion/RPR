import { Component, OnInit } from '@angular/core';
import {
  Faction,
  Senateur
} from 'src/app/data.interface';
import { FactionService } from 'src/app/services/faction.service';
import { RomeService } from 'src/app/services/rome.service';

@Component({
  selector: 'app-factions',
  templateUrl: './factions.component.html',
  styleUrls: ['./factions.component.scss']
})
export class FactionsComponent implements OnInit {
  public factions: Faction[] = [];
  public consulDeRome: Senateur;

  constructor(
    private factionService: FactionService,
    private romeService: RomeService
  ) { }

  ngOnInit() {
    this.factionService.getFactions()
    .subscribe((factions: Faction[]) => {
      this.factions = factions;
    })
  }

}
