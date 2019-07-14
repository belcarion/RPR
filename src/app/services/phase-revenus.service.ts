import { Injectable } from '@angular/core';
import { Faction, Senateur, Concession, TypeFaction } from '../data.interface';
import { RomeService } from './rome.service';
import { FactionService } from './faction.service';

@Injectable({
  providedIn: 'root'
})
export class PhaseRevenusService {

  private factions: Faction[];

  constructor(
    private romeService: RomeService,
    private factionService: FactionService
  ) {
    factionService.getFactions().subscribe((f: Faction[]) => {
      this.factions = f;
    });
  }

  public genereRevenus() {
    this.factions.forEach((faction: Faction) => {
      let revenus = 0;
      faction.senateurs.forEach((sen: Senateur) => {
        // Revenus de base
        sen.chef ? revenus += 3 : revenus++;
        revenus += sen.chevaliers;
        if (sen.concessions && sen.concessions.length > 0) {
          sen.concessions.forEach((c: Concession) => {
            revenus += c.revenu;
            sen.corrompu = true;
          });
        }
        // Spoliation des provinces
        if (sen.province) {
          let test = false;
          switch (faction.id) {
            case TypeFaction.POPULISTES:
              test = this.romeService.getRandomNumber(6) >= 3;
              break;
            case TypeFaction.IMPERIALISTES:
              test = this.romeService.getRandomNumber(6) >= 4;
              break;
            case TypeFaction.PLOUTOCRATES:
              test = true;
              break;
            default:
              break;
          }
          if (test) {
            const sp = this.romeService.getRandomNumber(6, 1, sen.province.spoliation[sen.province.developee]);
            console.log('Le sénateur ' + sen.nom + ' de la faction ' + faction.id
              + ' spolie la province ' + sen.province.nom + ' pour ' + sp + ' T');
            if (sp < 0) {
              this.romeService.majTresor(sp);
            } else {
              revenus += sp;
              sen.corrompu = true;
            }
          }
        }
      });
      // Redistribution des revenus des neutres
      console.log('Revenus collectés pour la faction ' + faction.id + ' = ' + revenus);
      if (faction.id === TypeFaction.POPULISTES) {
        // 1 T pour chaque sénateur et la faction, le reste au chef
        console.log('Revenus affectés au trésor : ' + revenus);
        faction.tresor++;
        revenus--;
        faction.senateurs.forEach((sen: Senateur) => {
          sen.tresor++;
          revenus--;
        });
        faction.senateurs.find((sen: Senateur) => {
          return sen.chef;
        }).tresor += revenus;
      } else if (faction.id === TypeFaction.IMPERIALISTES) {
        // 1d T pour la faction, le reste au chef
        const d = Math.min(this.romeService.getRandomNumber(6), revenus);
        console.log('Revenus affectés au trésor : ' + d);
        faction.tresor += d;
        revenus -= d;
        faction.senateurs.find((sen: Senateur) => {
          return sen.chef;
        }).tresor += revenus;
      } else if (faction.id === TypeFaction.CONSERVATEURS) {
        // La moitié pour la faction, le reste au chef
        const d = Math.floor(revenus / 2);
        console.log('Revenus affectés au trésor : ' + d);
        faction.tresor += d;
        revenus -= d;
        faction.senateurs.find((sen: Senateur) => {
          return sen.chef;
        }).tresor += revenus;
      } else if (faction.id === TypeFaction.PLOUTOCRATES) {
        // Egalement réparti entre chaque sénateur, le reste à la faction
        const d = Math.floor(revenus / faction.senateurs.length);
        faction.senateurs.forEach((sen: Senateur) => {
          sen.tresor += d;
          revenus -= d;
        });
        faction.tresor += revenus;
      }
    });
    this.factionService.majFactions(this.factions);
  }

  public spoliationProvince(senateur: Senateur) {
    const mod = senateur.province.spoliation[senateur.province.developee];
    const montant = this.romeService.getRandomNumber(6, 1, mod);
    let res = 'Province spoliée pour ' + montant + ' talent(s), ';
    if (montant > 0) {
      res += 'le sénateur gagne ' + montant + ' talent(s)';
      this.factionService.getFactionJoueur().senateurs.some((sen: Senateur) => {
        if (sen.nom === senateur.nom) {
          sen.tresor += montant;
          return true;
        } else {
          return false;
        }
      });
    } else {
      res += 'Rome paye ' + montant + ' talent(s)';
      this.romeService.majTresor(montant);
    }
    return res;
  }
}
