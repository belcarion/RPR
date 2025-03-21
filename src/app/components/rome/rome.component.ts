import { Component, OnInit, inject } from '@angular/core';
import { Carte, Legion, Escadre, Senateur, Concession } from 'src/app/data.interface';
import { RomeService } from 'src/app/services/rome.service';
import { combineLatest, BehaviorSubject } from 'rxjs';
import { ForumComponent } from '../forum/forum.component';

import { ConcessionComponent } from '../cartes/concession/concession.component';

@Component({
    selector: 'app-rome',
    templateUrl: './rome.component.html',
    styleUrls: ['./rome.component.scss'],
    imports: [ForumComponent, ConcessionComponent]
})
export class RomeComponent implements OnInit {
  private romeService = inject(RomeService);

  public tresor = 0;
  public agitationSociale = 0;
  public legions: Legion[];
  public escadres: Escadre[];
  public chefsEnnemis: Carte[] = [];
  public releveSenatoriale: Senateur[] = [];
  public concessionsDetruites: Concession[] = [];
  public forum: Carte[] = [];

  constructor() {
    const romeService = this.romeService;

    combineLatest([
      this.romeService.getChefsEnnemis(),
      this.romeService.getReleveSenatoriale(),
      this.romeService.getConcessionsDetruites(),
      this.romeService.getForum(),
      this.romeService.getTresor(),
      this.romeService.getLegionsActives(),
      romeService.getEscadresActives()
    ]).subscribe(
      ([ce, rs, cd, forum, tresor, l, e]: [
        Carte[],
        Senateur[],
        Concession[],
        Carte[],
        number,
        Legion[],
        Escadre[]
      ]) => {
        this.chefsEnnemis = ce;
        this.releveSenatoriale = rs;
        this.concessionsDetruites = cd;
        this.forum = forum;
        this.tresor = tresor;
        this.legions = l;
        this.escadres = e;
      }
    );
  }

  ngOnInit() {}
}
