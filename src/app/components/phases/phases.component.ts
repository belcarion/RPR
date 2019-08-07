import { Component, OnInit } from "@angular/core";
import { PhaseMortaliteService } from 'src/app/services/phase-mortalite.service';
import { PhaseRevenusService } from 'src/app/services/phase-revenus.service';
import { Phase } from 'src/app/services/tour.service';

@Component({
  selector: "app-phases",
  templateUrl: "./phases.component.html",
  styleUrls: ["./phases.component.scss"]
})
export class PhasesComponent implements OnInit {

  public tour = 1;
  public phase: Phase;
  private finDePartie = false;

  constructor(
    private phaseMortaliteService: PhaseMortaliteService,
    private phaseRevenusService: PhaseRevenusService
  ) {
  }

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
        this.tour++;
        break;
      // case Phase.FORUM:
      //   this.phase = Phase.PLEBE;
      //   break;
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
