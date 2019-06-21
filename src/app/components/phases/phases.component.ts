import { Component, OnInit } from "@angular/core";
import { PhaseMortaliteService } from 'src/app/services/phase-mortalite.service';
import { FactionService } from 'src/app/services/faction.service';
import { PhaseRevenusService } from 'src/app/services/phase-revenus.service';

@Component({
  selector: "app-phases",
  templateUrl: "./phases.component.html",
  styleUrls: ["./phases.component.scss"]
})
export class PhasesComponent implements OnInit {
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

  ngOnInit() {}

  public resolutionMortalite() {
    this.phaseMortaliteService.resolutionMortalite();
  }

  public resolutionRevenus() {
    this.phaseRevenusService.genereRevenus();
  }
}
