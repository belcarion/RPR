import { Injectable } from '@angular/core';
import { RomeService } from './rome.service';
import { TypeCarte, Faction, Senateur, SenateurVulnerable, TypeFaction } from '../data.interface';
import { FactionService } from './faction.service';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhaseForumService {

  private factions: Faction[];
  private senateursNonAlignes: Senateur[];

  constructor(
    private romeService: RomeService,
    private factionService: FactionService
  ) {
    combineLatest([
      this.factionService.getFactions(),
      this.romeService.getReleveSenatoriale()
    ]).subscribe(([f, rs]: [Faction[], Senateur[]]) => {
      this.factions = f;
      this.senateursNonAlignes = rs;
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

  public tentativePersuasion(faction: Faction): string[] {
    const msg = [];
    const sen1: Senateur = this.senateurPersuadeur(faction);
    console.log('Sénateur persuadeur = ' + sen1.nom);
    msg.push('Sénateur persuadeur = ' + sen1.nom);

    const sv: SenateurVulnerable = this.senateurPlusVulnerable(faction, sen1);
    console.log('Sénateur le plus vulnérable: ' + sv.senateur.nom);
    msg.push('Sénateur le plus vulnérable: ' + sv.senateur.nom);

    let nivReussite = sen1.eloquence + sen1.influence
      - (sv.senateur.loyaute + sv.senateur.tresor + (sv.tresorFaction ? 7 : 0));
    msg.push('Niveau de réussite initial = ' + nivReussite);
    let tresorFactions = 0;
    this.factions.forEach((f: Faction) => {
      if (f.id !== faction.id && f.id !== TypeFaction.JOUEUR) {
        tresorFactions += f.tresor;
      }
    });
    // TMP Tests
    nivReussite += 9;
    if (nivReussite > 4 && (nivReussite - 4) <= tresorFactions) {
      // Contre-corruption des neutres
      let contreCorruption = 0;
      // Trier les factions par trésor décroissant
      const fcc: Faction[] = this.factions.filter((f: Faction) => {
        const qq = (f.id !== faction.id && f.id !== TypeFaction.JOUEUR);
        return (f.id !== faction.id && f.id !== TypeFaction.JOUEUR);
      }).sort((a: Faction, b: Faction) => {
        if (a.tresor > b.tresor) {
          return -1;
        } else if (a.tresor < b.tresor) {
          return 1;
        }
        return 0;
      });
      while (nivReussite > 4) {
        for (let index = 0; index < fcc.length; index++) {
          if (nivReussite > 4 && fcc[index].tresor > 0) {
            msg.push('La faction ' + fcc[index].nom + ' ajoute 1 talent en contre-corruption');
            // Call service
            fcc[index].tresor -= 1;
            contreCorruption += 1;
            nivReussite -= 1;
          }
        }
      }
    }
    msg.push('Niveau de réussite final = ' + nivReussite);
    return msg;
  }

  public senateurPlusVulnerable(faction: Faction, senateur: Senateur): SenateurVulnerable {
    const sensVuln: SenateurVulnerable[] = [];
    let qq: SenateurVulnerable;
    this.factions.forEach((f: Faction) => {
      if (f.id !== faction.id) {
        f.senateurs.reduce((prev: Senateur, curr: Senateur) => {
          const sen = this.compareSenateursVulnerables(prev, curr, f.tresor);
          qq = { senateur: sen, tresorFaction: f.tresor, votesFaction: f.votes };
          return sen;
        });
        sensVuln.push(qq);
      }
    });
    if (this.senateursNonAlignes.length === 1) {
      qq = { senateur: this.senateursNonAlignes[0], tresorFaction: undefined, votesFaction: undefined };
      sensVuln.push(qq);
    } else if (this.senateursNonAlignes.length > 1) {
      this.senateursNonAlignes.reduce((prev: Senateur, curr: Senateur) => {
        const sen = this.compareSenateursVulnerables(prev, curr, 0);
        qq = { senateur: sen, tresorFaction: undefined, votesFaction: undefined };
        return sen;
      });
      sensVuln.push(qq);
    }
    const res = sensVuln.reduce((prev: SenateurVulnerable, curr: SenateurVulnerable) => {
      const p = prev.senateur.loyaute + prev.senateur.tresor + (prev.tresorFaction ? 7 + prev.tresorFaction : 0);
      const c = curr.senateur.loyaute + curr.senateur.tresor + (curr.tresorFaction ? 7 + curr.tresorFaction : 0);
      if (c < p) {
        return curr;
      } else if (c > p) {
        return prev;
      }
      // si égalité sénateur appartenant à la faction ayant le plus de voix
      if ( prev.votesFaction > curr.votesFaction) {
        return curr;
      }
      return prev;
    });
    return res;
  }

  private compareSenateursVulnerables(prev: Senateur, curr: Senateur, tresorF: number) {
    const p = prev.loyaute + prev.tresor + (tresorF ? 7 + tresorF : 0);
    const c = curr.loyaute + curr.tresor + (tresorF ? 7 + tresorF : 0);
    if (c < p) {
      return curr;
    } else if (c === p) {
      // si égalité sénateur le plus puissant (en ajoutant les valeurs d’éloquence et militaire)
      const tp = prev.eloquence + prev.militaire;
      const tc = curr.eloquence + curr.militaire;
      if (tc > tp) {
        return curr;
      } else if (tc < tp) {
        return prev;
      }
      return curr;
    } else {
      return prev;
    }
  }

  private senateurPersuadeur(f: Faction): Senateur {
    return f.senateurs.reduce((prev: Senateur, curr: Senateur) => {
      const p = prev.eloquence + prev.influence + prev.tresor;
      const c = curr.eloquence + curr.influence + curr.tresor;
      return c > p ? curr : prev;
    });
  }
}
