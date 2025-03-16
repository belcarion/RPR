import { Component, OnInit, inject } from '@angular/core';
import {
  Faction,
  Senateur
} from 'src/app/data.interface';
import { FactionService } from 'src/app/services/faction.service';
import { RomeService } from 'src/app/services/rome.service';

import { FactionComponent } from '../faction/faction.component';

@Component({
    selector: 'app-factions',
    templateUrl: './factions.component.html',
    styleUrls: ['./factions.component.scss'],
    imports: [FactionComponent]
})
export class FactionsComponent implements OnInit {
  private factionService = inject(FactionService);
  private romeService = inject(RomeService);

  public factions: Faction[] = [];
  public consulDeRome: Senateur;

  ngOnInit() {
    this.factionService.getFactions()
    .subscribe((factions: Faction[]) => {
      this.factions = factions;
    })
  }

}
