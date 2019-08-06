import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FactionService } from 'src/app/services/faction.service';
import { Faction, Senateur } from 'src/app/data.interface';
import { PhaseRevenusService } from 'src/app/services/phase-revenus.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { RomeService } from 'src/app/services/rome.service';

// spoliation/développement province
// redistribution
// contributions
@Component({
  selector: 'app-phase-revenu',
  templateUrl: './phase-revenu.component.html',
  styleUrls: ['./phase-revenu.component.scss']
})
export class PhaseRevenuComponent implements OnInit {
  @Output() fin: EventEmitter<boolean> = new EventEmitter<boolean>();

  public etape = 0;
  public faction: Faction;
  public gouverneurs: Senateur[];
  public spoliation: number;
  public result: string[] = [];

  public aRedistribuer = 0;
  public senateurs: Senateur[];

  constructor(
    private factionService: FactionService,
    private phaseRevenusService: PhaseRevenusService,
    private romeService: RomeService
  ) { }

  ngOnInit() {
    this.phaseRevenusService.genereRevenus();
    this.faction = this.factionService.getFactionJoueur();
    this.senateurs = this.faction.senateurs;
    this.gouverneurs = this.faction.senateurs.filter((sen: Senateur) => {
      return sen.province !== undefined;
    });
    if (this.gouverneurs && this.gouverneurs.length > 0) {
      this.etape = 1;
    } else {
      this.etape = 2;
    }
  }

  public spoliationPar(event: MatCheckboxChange, senateur: Senateur, i: number) {
    if (event.checked) {
      event.source.disabled = true;
      this.result[i] = this.phaseRevenusService.spoliationProvince(senateur);
    }
  }

  public suivant() {
    switch (this.etape) {
      case 1:
        this.etape++;
        break;
      case 2:
        this.result = this.phaseRevenusService.developpementProvince();
        this.etape++;
        break;
      case 3:
        this.etape++;
        break;
      case 4:
        this.result = this.romeService.dettes();
        this.etape++;
        break;
      case 5:
        this.result = this.factionService.retourGouverneurs();
        this.etape++;
        break;
      default:
        this.fin.emit(true);
        break;
    }
  }

  public clickFaction(plus: boolean) {
    if (!plus) {
      this.faction.tresor--;
      this.aRedistribuer++;
    } else {
      this.faction.tresor++;
      this.aRedistribuer--;
    }
  }
  public redistribution(plus: boolean, senateur: Senateur) {
    if (!plus) {
      senateur.tresor--;
      this.aRedistribuer++;
    } else {
      senateur.tresor++;
      this.aRedistribuer--;
    }
  }

  public contribution(v: number, senateur: Senateur) {
    senateur.tresor -= v;
    switch (v) {
      case 10:
        senateur.popularite += 1;
        break;
      case 25:
        senateur.popularite += 3;
        break;
      case 50:
        senateur.popularite += 7;
        break;

      default:
        break;
    }
    this.romeService.majTresor(v);
  }

}
