import { Component, OnInit } from '@angular/core';
import { PhaseForumService } from 'src/app/services/phase-forum.service';
import { FactionService } from 'src/app/services/faction.service';

@Component({
  selector: 'app-phase-forum',
  templateUrl: './phase-forum.component.html',
  styleUrls: ['./phase-forum.component.scss']
})
export class PhaseForumComponent implements OnInit {

  constructor(
    private phaseForumService: PhaseForumService,
    private factionService: FactionService
  ) { }

  ngOnInit() {
    const sen = this.phaseForumService.senateurPlusVulnerable(
      this.factionService.getFactionJoueur(),
      this.factionService.getFactionJoueur().senateurs[0]);
  }

}
