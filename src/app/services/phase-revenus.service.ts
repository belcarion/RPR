import { Injectable, inject } from '@angular/core';
import { Faction, Senateur, Concession, TypeFaction } from '../data.interface';
import { RomeService } from './rome.service';
import { FactionService } from './faction.service';

@Injectable({
  providedIn: 'root'
})
export class PhaseRevenusService {
  private romeService = inject(RomeService);
  private factionService = inject(FactionService);


  private factions: Faction[];

  constructor() {
    const factionService = this.factionService;

    factionService.getFactions().subscribe((f: Faction[]) => {
      this.factions = f;
    });
  }

  public genereRevenus() {
    this.romeService.majTresor(100);
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
        if (faction.id === TypeFaction.JOUEUR) {
          sen.tresor += revenus;
          revenus = 0;
        }
        // Spoliation des provinces
        if (faction.id !== TypeFaction.JOUEUR && sen.province) {
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
            const sp = this.romeService.getRandomNumber(6, 1, sen.province.spoliation[sen.province.developpee]);
            sen.corrompu = true;
            console.log('Le sénateur' + sen.nom + ' de la faction ' + faction.id
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
    const mod = senateur.province.spoliation[senateur.province.developpee];
    const montant = this.romeService.getRandomNumber(6, 1, mod);
    let res = 'Province spoliée pour ' + montant + ' talent(s), ';
    senateur.corrompu = true;
    if (montant > 0) {
      res += 'le sénateur gagne ' + montant + ' talent(s)';
      this.factions.forEach((f: Faction) => {
        if (f.id === TypeFaction.JOUEUR) {
          f.senateurs.some((sen: Senateur) => {
            if (sen.nom === senateur.nom) {
              sen.tresor += montant;
              return true;
            } else {
              return false;
            }
          });
        }
      });
      this.factionService.majFactions(this.factions);
    } else {
      res += 'Rome paye ' + montant + ' talent(s)';
      this.romeService.majTresor(montant);
    }
    return res;
  }

  public developpementProvince(): string[] {
    const msg = [];
    this.factions.forEach((f: Faction) => {
      f.senateurs.forEach((sen: Senateur) => {
        if (!sen.rebelle && sen.province && sen.province.developpee === 0) {
          console.log(sen.nom + ' tente de développer la province ' + sen.province.nom);
          const de = this.romeService.getRandomNumber(6, 1, sen.corrompu ? 1 : 0);
          console.log('Tirage = ' + de);
          if (de >= 6) {
            msg.push('Le sénateur ' + sen.nom + ' développe la province ' + sen.province.nom + '.');
            sen.province.developpee = 1;
            sen.influence += 3;
          }
        }
      });
    });
    this.factionService.majFactions(this.factions);
    return msg;
  }

  public contribution(v: number, senateur: Senateur) {
    senateur.tresor -= v;
    switch (v) {
      case 10:
        senateur.popularite += 1;
        break;
      case 25:
        senateur.popularite += 3;
        break;
      case 50:
        senateur.popularite += 7;
        break;
      default:
        break;
    }
    this.factionService.majSenateur(senateur);
    this.romeService.majTresor(v);
  }

  public contributionsNeutres(c: number): string[] {
    const msg = [];
    this.factions.forEach((f: Faction) => {
      if (f.id === TypeFaction.CONSERVATEURS || f.id === TypeFaction.IMPERIALISTES) {
        f.senateurs.forEach((sen: Senateur) => {
          let pop = 0;
          // un neutre fera toujours une contribution
          // s’il le peut et si cela lui permet d’avoir 35 ou plus
          // en influence
          const manqueInf = 35 - sen.influence;
          if (manqueInf === 1 && sen.tresor >= 10) {
            pop += 1;
            sen.tresor -= 10;
          } else if (manqueInf <= 3 && sen.tresor >= 25) {
           pop += 3;
           sen.tresor -= 25;
        } else if (manqueInf === 7 && sen.tresor >= 50) {
          pop += 7;
          sen.tresor -= 50;
        } else if (sen.tresor >= c) {
            switch (c) {
              case 10:
                pop = 1;
                break;
              case 25:
                pop = 3;
                break;
              case 50:
                pop = 7;
                break;
              default:
                break;
            }
            sen.tresor -= c;
          }
          if (pop > 0) {
            sen.popularite += pop;
            this.factionService.majSenateur(sen);
            this.romeService.majTresor(c);
            msg.push('Le sénateur ' + sen.nom + ' de la faction ' + f.nom
            + ' contribue au trésor de Rome pour ' + c + 'talents.');
          }
        });
      }
    });
    return msg;
  }
}
