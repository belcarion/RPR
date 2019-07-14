import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PhaseMortaliteService } from 'src/app/services/phase-mortalite.service';
import { FactionService } from 'src/app/services/faction.service';

@Component({
  selector: 'app-phase-mortalite',
  templateUrl: './phase-mortalite.component.html',
  styleUrls: ['./phase-mortalite.component.scss']
})
export class PhaseMortaliteComponent implements OnInit {
  @Output() fin: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private factionService: FactionService,
    private phaseMortaliteService: PhaseMortaliteService
  ) { }

  ngOnInit() {
    this.phaseMortaliteService.resolutionMortalite();
  }

  public suivant() {
    this.fin.emit(true);
  }
}
