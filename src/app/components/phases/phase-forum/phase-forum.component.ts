import { Component, inject, OnInit, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Faction, TypeFaction } from 'src/app/data.interface';
import { FactionService } from 'src/app/services/faction.service';
import { PhaseForumService } from 'src/app/services/phase-forum.service';

@Component({
  selector: 'app-phase-forum',
  templateUrl: './phase-forum.component.html',
  styleUrls: ['./phase-forum.component.scss'],
  imports: [MatButton],
})
export class PhaseForumComponent implements OnInit {
  private phaseForumService = inject(PhaseForumService);
  private factionService = inject(FactionService);

  readonly fin = output<boolean>();
  public result: string[];
  public factions: Faction[];
  public factionJouant: Faction;

  constructor() {
    const factionService = this.factionService;

    factionService.getFactions().subscribe((f: Faction[]) => {
      this.factions = f;
    });
  }

  ngOnInit() {
    this.factionJouant = this.factionService.getSPHR().faction;
    this.result = this.phaseForumService.tentativePersuasion(this.factionService.getFaction(TypeFaction.JOUEUR));
  }

  public suivant() {
    this.fin.emit(true);
  }
}
