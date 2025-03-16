import { Component, OnInit, inject, output } from '@angular/core';
import { FactionService } from 'src/app/services/faction.service';
import { Faction, Senateur, TypeFaction } from 'src/app/data.interface';
import { PhaseRevenusService } from 'src/app/services/phase-revenus.service';
import { MatCheckboxChange, MatCheckbox } from '@angular/material/checkbox';
import { RomeService } from 'src/app/services/rome.service';
import { MatButton } from '@angular/material/button';


// spoliation/développement province
// redistribution
// contributions
@Component({
    selector: 'app-phase-revenu',
    templateUrl: './phase-revenu.component.html',
    styleUrls: ['./phase-revenu.component.scss'],
    imports: [MatButton, MatCheckbox]
})
export class PhaseRevenuComponent implements OnInit {
  private factionService = inject(FactionService);
  private phaseRevenusService = inject(PhaseRevenusService);
  private romeService = inject(RomeService);

  readonly fin = output<boolean>();

  public etape = 0;
  public faction: Faction;
  public gouverneurs: Senateur[];
  public spoliation: number;
  public result: string[] = [];
  public senateurs: Senateur[];
  public senateursNonRebelles: Senateur[];
  private contribution: number;

  ngOnInit() {
    this.phaseRevenusService.genereRevenus();
    this.faction = this.factionService.getFaction(TypeFaction.JOUEUR);
    this.senateurs = this.faction.senateurs;
    this.senateursNonRebelles = this.faction.senateurs.filter((s: Senateur) => !s.rebelle);
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
        this.result = [];
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
    } else {
      this.faction.tresor++;
    }
  }
  public redistribution(plus: boolean, senateur: Senateur) {
    if (!plus) {
      senateur.tresor--;
      this.faction.tresor++;
    } else {
      senateur.tresor++;
      this.faction.tresor--;
    }
  }

  public contributionJoueur(v: number, senateur: Senateur) {
    this.contribution = v;
    this.phaseRevenusService.contribution(v, senateur);
    this.result = this.phaseRevenusService.contributionsNeutres(this.contribution);
  }

}
