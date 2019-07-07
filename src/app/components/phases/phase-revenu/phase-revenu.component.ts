import { Component, OnInit } from '@angular/core';
import { FactionService } from 'src/app/services/faction.service';
import { Faction, Senateur } from 'src/app/data.interface';
import { PhaseRevenusService } from 'src/app/services/phase-revenus.service';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

// spoliation/développement province
// redistribution
// contributions
@Component({
  selector: 'app-phase-revenu',
  templateUrl: './phase-revenu.component.html',
  styleUrls: ['./phase-revenu.component.scss']
})
export class PhaseRevenuComponent implements OnInit {
public etape = 0;
public faction: Faction;
public gouverneurs: Senateur[];
public spoliation: number;

  constructor(
    private factionService: FactionService,
    private phaseRevenusService: PhaseRevenusService
  ) { }

  ngOnInit() {
    this.phaseRevenusService.genereRevenus();
    this.faction = this.factionService.getFactionJoueur();
    this.gouverneurs = this.faction.senateurs.filter((sen: Senateur) => {
      return sen.province !== undefined;
    });
    if (this.gouverneurs && this.gouverneurs.length > 0) {
      this.etape = 1;
    }
  }

  public spoliationPar(event: MatButtonToggleChange, senateur: Senateur) {
    if (event.value === 'oui') {
      this.phaseRevenusService.spoliationProvince(senateur);
    }
  }
}
