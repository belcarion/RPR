import { Injectable } from '@angular/core';
import {
  Senateur,
  Faction,
  Carte,
  TypeFaction,
  Charge,
  TypeCarte,
  Concession,
  TypeCharge
} from '../data.interface';
import { RomeService } from './rome.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FactionService {
  private _factions: BehaviorSubject<Faction[]> = new BehaviorSubject<
    Faction[]
  >([]);

  constructor(private romeService: RomeService, private snackBar: MatSnackBar) {
    this.initFactions();
  }

  public getFactions(): Observable<Faction[]> {
    return this._factions.asObservable();
  }
  public majFactions(f: Faction[]) {
    this._factions.next(f);
  }
  public majFaction(nf: Faction) {
    const factions: Faction[] = this._factions.getValue();
    factions.forEach((f: Faction) => {
      if (f.id === nf.id) {
        f.tresor = nf.tresor;
        f.chef = nf.chef;
      }
    });
    this._factions.next(factions);
  }
  public getFaction(type: TypeFaction) {
    return this._factions.getValue().find((f: Faction) => f.id === type);
  }

  public getTotalAptitude(faction: Faction, aptitude: string): number {
    let mil = 0;
    faction.senateurs?.forEach((s: Senateur) => {
      mil += s[aptitude];
    });
    return mil;
  }

  public updateVotes(f: Faction) {
    let votes = 0;
    f.senateurs?.forEach((s: Senateur) => {
      if (!s.province) {
        votes = votes + s.eloquence + (s.chevaliers ?? 0);
      }
    });
    f.votes = votes;
  }


  /**
   * quand un neutre
   * choisit une concession, elle doit être donnée à son
   * sénateur à Rome ayant le moins de concessions. En
   * cas d’égalité, c’est le sénateur impliqué avec le plus
   * d’influence qui la reçoit.
   * @param f: Faction
   * @param c: Carte
   */
  public attribueConcession(f: Faction, c: Concession) {
    const senMoinsConcessions = f.senateurs?.reduce(
      (previous: Senateur, current: Senateur) => {
        const pl = previous.concessions ? previous.concessions.length : 0;
        if (!current.concessions || current.concessions.length < pl) {
          return current;
        } else {
          return previous;
        }
      }
    );
    const nbConcessions = senMoinsConcessions?.concessions
      ? senMoinsConcessions.concessions.length
      : 0;
    const sensMoinsConcessions = f.senateurs?.filter((sen: Senateur) => {
      return sen.concessions && sen.concessions.length === nbConcessions;
    });
    if (sensMoinsConcessions && sensMoinsConcessions.length > 1) {
      const senMinConcessionsPlusInfluent = sensMoinsConcessions.reduce(
        (previous: Senateur, current: Senateur) => {
          if (current.influence > previous.influence) {
            return current;
          } else {
            return previous;
          }
        }
      );
      senMinConcessionsPlusInfluent.concessions?.push(c);
    } else {
      senMoinsConcessions?.concessions?.push(c);
    }
  }

  public retireSenateurMort(senateursMorts: number[]): string[] {
    const factions = this._factions.getValue();
    const result: string[] = [];
    senateursMorts.forEach((sin: number) => {
      factions.forEach((f: Faction) => {
        const sen = f.senateurs?.find((s: Senateur) => {
          return s.in === sin;
        });
        if (sen) {
          const sens = f.senateurs?.filter((s: Senateur) => s.in !== sen.in);
          f.senateurs = sens;
          let msg = 'Le sénateur ' +
            sen.nom +
            ' de la faction ' +
            f.nom +
            ' décède.';
          if (sen.concessions) {
            sen.concessions.forEach((concession: Carte) => {
              msg += ' La concession ' + concession.nom + ' retourne au forum.';
              this.romeService.addConcessionDetruite(concession);
            });
          }
          if (sen.province) {
              msg += ' La province ' + sen.province.nom + ' retourne au forum.';
              sen.province.mandat = 0;
              this.romeService.ajouterForum(sen.province);
          }
          if (!sen.chef) {
            this.romeService.addReleveSenatoriale(sen);
          } else {
            sen.chevaliers = 0;
            sen.influence = 0;
            sen.popularite = 0;
            sen.rebelle = false;
            sen.tresor = 0;
            sen.corrompu = false;
            sen.charge = { rang: 7, nom: TypeCharge.SANS };
          }
          result.push(msg);
        }
        this.updateVotes(f);
      });
    });
    if (result.length === 0) {
      result.push('Aucun sénateur ne décède !');
    }
    // this.snackBar.open(msg, 'OK', { duration: 9000, verticalPosition: 'top' });
    return result;
  }

  public hommeDetatJouable(he: Senateur, faction: Faction): boolean {
    let jouable = true;
    const factions = this._factions.getValue();
    factions.forEach((f: Faction) => {
      if (f.id !== faction.id) {
        jouable = (f.senateurs?.find((sen: Senateur) => {
        // Un adversaire controle la carte famille apparentée ?
        const test1 = sen.in === he.in;
        // Un homme d'état de la même famille avec le même IN est déjà en jeu
        // Exception: 25 A/B ou 29A/B => scenarii moyenne et basse république
        const test2 = sen.inA && sen.in === he.in;
        return test1 || test2;
        }) === undefined);
      }
    });
    return jouable;
  }

  public joueHommeDetat(he: Senateur, faction: Faction) {
    const senHe = faction.senateurs?.find((sen: Senateur) => sen.in === he.in);
    if (senHe) {
      // La famille est déjà contrôlée
      he.influence = Math.max(he.influence, senHe.influence);
      he.popularite = Math.max(he.popularite ?? 0, senHe.popularite ?? 0);
      he.province = senHe.province;
      he.concessions = senHe.concessions;
      he.tresor = senHe.tresor;
      he.ancienConsul = senHe.ancienConsul;
      he.chef = senHe.chef;
      he.chevaliers = senHe.chevaliers;
      he.corrompu = senHe.corrompu;
      he.charge = senHe.charge;
      const msg = 'La faction ' + faction.nom + ' contrôle déjà la famille de l\'homme d\'état qu\'elle joue';
      this.snackBar.open(msg, '', { duration: 2000, verticalPosition: 'top' });
    } else {
      // si carte au forum la prendre
      const senApp = this.romeService.senateurApparenteHE(he);
      if (senApp) {
        this.romeService.prendreForum(senApp);
        faction.senateurs?.push(senApp);
      }
    }
    faction.senateurs?.push(he);
  }

  public initFactions() {
    const factions: Faction[] = [];
    for (let index = 0; index < 5; index++) {
      const f: Faction = {
        nom: 'Belcarus', cartes: [], tresor: 0,
        votes: 0,
        senateurs: [],
        chef: 0,
        suivant: TypeFaction.JOUEUR
      };
      f.senateurs = this.romeService.getRandomSenateurs(3);
      factions.push(f);
    }
    factions[0].id = TypeFaction.JOUEUR;
    factions[0].suivant = TypeFaction.PLOUTOCRATES;
    // Ploutocrates : plus grande influence
    const ploutocrates = factions
      .filter((f: Faction) => !f.id)
      .reduce((previous: Faction, current: Faction) => {
        if (
          this.getTotalAptitude(current, 'influence') >
          this.getTotalAptitude(previous, 'influence')
        ) {
          return current;
        } else {
          return previous;
        }
      });
    ploutocrates.id = TypeFaction.PLOUTOCRATES;
    ploutocrates.nom = 'PLOUTOCRATES';
    ploutocrates.suivant = TypeFaction.IMPERIALISTES;
    // Impérialistes : plus grande aptitude militaire
    const imp = factions
      .filter((f: Faction) => !f.id)
      .reduce((previous: Faction, current: Faction) => {
        if (
          this.getTotalAptitude(current, 'militaire') >
          this.getTotalAptitude(previous, 'militaire')
        ) {
          return current;
        } else {
          return previous;
        }
      });
    imp.id = TypeFaction.IMPERIALISTES;
    imp.nom = 'IMPERIALISTES';
    imp.suivant = TypeFaction.CONSERVATEURS;
    // Conservateurs : plus petite influence
    const conservateurs = factions
      .filter((f: Faction) => !f.id)
      .reduce((previous: Faction, current: Faction) => {
        if (
          this.getTotalAptitude(current, 'influence') <
          this.getTotalAptitude(previous, 'influence')
        ) {
          return current;
        } else {
          return previous;
        }
      });
    conservateurs.id = TypeFaction.CONSERVATEURS;
    conservateurs.nom = 'CONSERVATEURS';
    conservateurs.suivant = TypeFaction.POPULISTES;
    // Populistes : faction restante
    factions.forEach((f: Faction) => {
      if (!f.id) {
        f.id = TypeFaction.POPULISTES;
        f.nom = 'POPULISTES';
        f.suivant = TypeFaction.JOUEUR;
      }
    });
    factions.forEach((f: Faction) => {
      if (f.id === TypeFaction.CONSERVATEURS) {
        f.senateurs = f.senateurs?.concat(
          this.romeService.getRandomSenateurs(2)
        );
      } else if (f.id === TypeFaction.POPULISTES) {
        f.senateurs = f.senateurs.concat(
          this.romeService.getRandomSenateurs(1)
        );
      } else if (f.id === TypeFaction.PLOUTOCRATES) {
        f.senateurs.reduce((previous: Senateur, current: Senateur) => {
          if (current.influence >= previous.influence) {
            current.charge = { rang: 2, nom: TypeCharge.CONSUL_DE_ROME };
            current.influence += 5;
            current.ancienConsul = true;
            previous.charge =  { rang: 7, nom: TypeCharge.SANS };
            // this.consulDeRome = current;
            return current;
          } else {
            return previous;
          }
        });
      }
    });
    // Piocher 3 cartes pour chaque faction
    factions.forEach((f: Faction) => {
      let nbCartesPiochees = 0,
        c: Carte;
        console.log('Pioche pour faction = ', f.nom);
      do {
        c = this.romeService.prendreDansPioche();
        console.log('carte piochée = ', c.nom);
        switch (c.type) {
          case TypeCarte.CONCESSION:
            this.attribueConcession(f, c as Concession);
            nbCartesPiochees++;
            break;
          case TypeCarte.HOMMEDETAT:
            if (this.hommeDetatJouable(c as Senateur, f)) {
              this.joueHommeDetat(c as Senateur, f);
              console.log('HE joué = ', c.nom);
            } else {
              f.cartes.push(c);
            }
            nbCartesPiochees++;
            break;
          case TypeCarte.LOI:
          case TypeCarte.INTRIGUE:
            f.cartes.push(c);
            nbCartesPiochees++;
            break;
          default:
            this.romeService.remettreDansPioche(c);
        }
      } while (nbCartesPiochees < 3);
      this.setChefDeFaction(f);
      this.updateVotes(f);
    });
    this._factions.next(factions);
  }

  public setChefDeFaction(faction: Faction) {
    let chef: number;
    let cdf: Senateur | undefined;
    if (
      faction.id === TypeFaction.CONSERVATEURS ||
      faction.id === TypeFaction.PLOUTOCRATES
    ) {
      // Sénateur à la plus grande influence
      cdf = faction.senateurs.reduce(
        (previous: Senateur, current: Senateur) => {
          if (current.influence > previous.influence) {
            chef = current.in;
            return current;
          } else {
            return previous;
          }
        }
      );
    } else if (faction.id === TypeFaction.IMPERIALISTES) {
      // Sénateur à la plus grande aptitude militaire
      cdf = faction.senateurs.reduce(
        (previous: Senateur, current: Senateur) => {
          if (current.militaire > previous.militaire) {
            chef = current.in;
            return current;
          } else {
            return previous;
          }
        }
      );
    } else if (faction.id === TypeFaction.POPULISTES) {
      // Sénateur à la plus grande aptitude militaire
      cdf = faction.senateurs.reduce(
        (previous: Senateur, current: Senateur) => {
          if (
            current.influence + current.popularite >
            previous.influence + previous.popularite
          ) {
            chef = current.in;
            return current;
          } else {
            return previous;
          }
        }
      );
    } else if (faction.id === TypeFaction.JOUEUR) {
      faction.senateurs[0].chef = true;
      faction.senateurs[0].province = this.romeService.prendreProvince();
      faction.senateurs[1].province = this.romeService.prendreProvince();
    }
    // TMP Tests
    if (cdf !== undefined) {
      cdf.chef = true;
     cdf.province = this.romeService.prendreProvince();
    }
  }

  public retourGouverneurs(): string[] {
    const msg: string[] = [];
    const factions: Faction[] = this._factions.getValue();
    factions.forEach((faction: Faction) => {
      faction.senateurs.forEach((sen: Senateur) => {
        if (sen.province?.mandat && sen.province.mandat > 1) {
          sen.province.mandat -= 1;
        } else if (sen.province && sen.province.mandat === 1) {
          msg.push('Le sénateur ' + sen.nom + ' rend sa province ' + sen.province.nom + ' et retourne à Rome');
          sen.province.mandat -= 1;
          this.romeService.ajouterForum(sen.province);
          sen.province = null;
          this.updateVotes(faction);
        }
      });
    });
    return msg;
  }

  public majSenateur(senateur: Senateur) {
    const factions: Faction[] = this._factions.getValue();
    factions.some((f: Faction) => {
      return f.senateurs.some((s: Senateur) => {
        if (s.nom === senateur.nom) {
          s.popularite = senateur.popularite;
          s.province = senateur.province;
          s.rebelle = senateur.rebelle;
          s.corrompu = senateur.corrompu;
          s.tresor = senateur.tresor;
          s.ancienConsul = senateur.ancienConsul;
          s.charge = senateur.charge;
          s.chevaliers = senateur.chevaliers;
          return true;
        }
        return false;
      });
    });
    this._factions.next(factions);
  }

  public getSPHR(): any {
    const factions: Faction[] = this._factions.getValue();
    let fsphr: Faction | undefined;
    let sphr: Senateur | undefined;
    factions.forEach((f: Faction) => {
      const s = f.senateurs
      .filter((sen: Senateur) => !sen.province)
      .reduce((prev: Senateur, curr: Senateur) => {
        if (curr.charge.rang > prev.charge.rang) {
          return curr;
        }
        return prev;
      });
      if (!sphr || s.charge.rang > sphr.charge.rang) {
        sphr = s;
        fsphr = f;
      }
    });
    if (!sphr || sphr.charge.nom === TypeCharge.SANS) {
      // Si aucun, sénateur le plus influent
      factions.forEach((f: Faction) => {
        const s = f.senateurs
        .filter((sen: Senateur) => !sen.province)
        .reduce((previous: Senateur, current: Senateur) => {
          if (current.influence >= previous.influence) {
            return current;
          } else {
            return previous;
          }
        });
        if (!sphr || s.influence > sphr.influence) {
          sphr = s;
          fsphr = f;
        }
      });
    }
    return { sphr: sphr, faction: fsphr };
  }

}
