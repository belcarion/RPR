import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PhaseForumService } from 'src/app/services/phase-forum.service';
import { FactionService } from 'src/app/services/faction.service';
import { Faction, TypeFaction } from 'src/app/data.interface';

@Component({
  selector: 'app-phase-forum',
  templateUrl: './phase-forum.component.html',
  styleUrls: ['./phase-forum.component.scss']
})
export class PhaseForumComponent implements OnInit {
  @Output() fin: EventEmitter<boolean> = new EventEmitter<boolean>();
  public result: string[];
  public factions: Faction[];
  public factionJouant: Faction;

  constructor(
    private phaseForumService: PhaseForumService,
    private factionService: FactionService
  ) {
    factionService.getFactions()
      .subscribe((f: Faction[]) => {
        this.factions = f;
      });
  }

  ngOnInit() {
    this.factionJouant = this.factionService.getSPHR().faction;
    this.result = this.phaseForumService.tentativePersuasion(
      this.factionService.getFaction(TypeFaction.JOUEUR));
  }

  public suivant() {
    this.fin.emit(true);
  }

}
