import { Component, OnInit, inject } from "@angular/core";
import { PhaseMortaliteService } from 'src/app/services/phase-mortalite.service';
import { PhaseRevenusService } from 'src/app/services/phase-revenus.service';
import { Phase } from 'src/app/services/tour.service';

import { PhaseMortaliteComponent } from "./phase-mortalite/phase-mortalite.component";
import { PhaseRevenuComponent } from "./phase-revenu/phase-revenu.component";
import { PhaseForumComponent } from "./phase-forum/phase-forum.component";

@Component({
    selector: "app-phases",
    templateUrl: "./phases.component.html",
    styleUrls: ["./phases.component.scss"],
    imports: [PhaseMortaliteComponent, PhaseRevenuComponent, PhaseForumComponent]
})
export class PhasesComponent implements OnInit {
  private phaseMortaliteService = inject(PhaseMortaliteService);
  private phaseRevenusService = inject(PhaseRevenusService);


  public tour = 1;
  public phase: Phase;
  private finDePartie = false;

  ngOnInit() {
    this.phase = Phase.MORTALITE;
  }

  public resolutionMortalite() {
    this.phase = Phase.MORTALITE;
  }

  public resolutionRevenus() {
    this.phase = Phase.REVENU;
  }

  public finPhase(phase: Phase) {
    switch (phase) {
      case Phase.MORTALITE:
        this.phase = Phase.REVENU;
        break;
      case Phase.REVENU:
        this.phase = Phase.FORUM;
        break;
      case Phase.FORUM:
        this.phase = Phase.PLEBE;
        this.phase = Phase.MORTALITE;
        this.tour++;
        break;
      // case Phase.PLEBE:
      //   this.phase = Phase.SENAT;
      //   break;
      // case Phase.SENAT:
      //   this.phase = Phase.COMBAT;
      //   break;
      // case Phase.COMBAT:
      //   this.phase = Phase.GUERRE_CIVILE;
      //   break;
      // case Phase.GUERRE_CIVILE:
      //   this.phase = Phase.MORTALITE;
      //   this.tour++;
      //   break;
      default:
        break;
    }
  }
}
