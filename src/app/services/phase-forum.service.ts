import { Injectable } from '@angular/core';
import { RomeService } from './rome.service';
import { TypeCarte, Faction, Senateur } from '../data.interface';
import { FactionService } from './faction.service';

@Injectable({
  providedIn: 'root'
})
export class PhaseForumService {

  private factions: Faction[];

  constructor(
    private romeService: RomeService,
    private factionService: FactionService
  ) {
      this.factionService.getFactions().subscribe((f: Faction[]) => {
      this.factions = f;
    });
  }

  public initiative() {
    const de = this.romeService.getRandomNumber(12, 2);
    console.log('Jet d\'initiative = ' + de);
    if (de === 7) {
      console.log('Evènement !');
    } else {
      const c = this.romeService.prendreDansPioche();
      if (c.type !== TypeCarte.SENATEUR) {
        this.romeService.ajouterForum(c);
      } else {
      }
    }
  }

  public senateurPlusVulnerable(faction: Faction, senateur: Senateur): Senateur {
    const senNiv = senateur.eloquence + senateur.influence;
    const sensVuln = [];
    this.factions.forEach((f: Faction) => {
      if (f.id !== faction.id) {
        const senVuln = f.senateurs.reduce((prev: Senateur, curr: Senateur) => {
          const p = prev.loyaute + prev.tresor + 7 + f.tresor;
          const c = curr.loyaute + curr.tresor + 7 + f.tresor;
          if (c <= p) {
            return curr;
          } else {
            return prev;
          }
        });
        sensVuln.push({ sen: senVuln, tresorF: f.tresor });
      }
    });
    const sen = sensVuln.reduce((prev: any, curr: any) => {
      const p = prev.sen.loyaute + prev.sen.tresor + 7 + prev.tresorF;
      const c = curr.sen.loyaute + curr.sen.tresor + 7 + curr.tresorF;
      if (c <= p) {
        return curr;
      } else {
        return prev;
      }
    });
    console.log('Sénateur le plus vulnérable: ' + sen.sen.nom);
    return sen.sen;
  }
}
