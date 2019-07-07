import { Component, OnInit } from "@angular/core";
import { PhaseMortaliteService } from 'src/app/services/phase-mortalite.service';
import { FactionService } from 'src/app/services/faction.service';
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

  public isMortaliteDone: boolean[] = [false, false, false];
  public isRevenuDone: boolean[] = [false, false, false, false, false, false, false, false, false];
  public isForumDone = false;
  public isPlebeDone = false;
  public isSenatDone = false;
  public isCombatDone = false;
  public isGuerreCivileDone = false;

  constructor(
    private phaseMortaliteService: PhaseMortaliteService,
    private phaseRevenusService: PhaseRevenusService
  ) {
  }

  ngOnInit() {
    // while (!this.finDePartie) {
      // this.resolutionMortalite();
      this.resolutionRevenus();
    // }
  }

  public resolutionMortalite() {
    this.phase = Phase.MORTALITE;
    this.phaseMortaliteService.resolutionMortalite();
  }

  public resolutionRevenus() {
    this.phase = Phase.REVENU;
  }
}
