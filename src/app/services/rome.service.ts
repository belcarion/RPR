import { Injectable } from '@angular/core';
import { SENATEURS, HOMMESDETAT } from '../data/senateurs.data';
import { of, Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Senateur,
  Carte,
  Concession,
  Intrigue,
  TypeCarte,
  Guerre,
  Province,
  ChefEnnemi,
  Legion
} from '../data.interface';
import { CONCESSIONS } from '../data/concessions.data';
import { INTRIGUES } from '../data/intrigues.data';
import { GUERRES, PROVINCES, CHEFS_ENNEMIS, GuerreId } from '../data/cartes.data';

@Injectable({
  providedIn: 'root'
})
export class RomeService {
  private _pioche: Carte[] = [];
  // private pioche: BehaviorSubject<Carte[]> = new BehaviorSubject<Carte[]>([]);
  private chefsEnnemis: BehaviorSubject<Carte[]> = new BehaviorSubject<Carte[]>(
    []
  );
  private releveSenatoriale: BehaviorSubject<Carte[]> = new BehaviorSubject<
    Carte[]
  >([]);
  private concessionsDetruites: BehaviorSubject<Carte[]> = new BehaviorSubject<
    Carte[]
  >([]);
  private tresor: BehaviorSubject<number> = new BehaviorSubject<number>(100);
  private forum: BehaviorSubject<Carte[]> = new BehaviorSubject<Carte[]>([]);
  public provinces: Carte[] = [];
  private forcesActives: BehaviorSubject<Legion[]> = new BehaviorSubject<Legion[]>([]);

  constructor() {
    const senateurs: Senateur[] = SENATEURS.map((sen: Senateur) => {
      sen.concessions = [];
      sen.chevaliers = 0;
      sen.tresor = 0;
      sen.corrompu = false;
      sen.ancienConsul = false;
      return sen;
    });
    const hommesEtat: Senateur[] = HOMMESDETAT.map((sen: Senateur) => {
      sen.concessions = [];
      sen.chevaliers = 0;
      sen.tresor = 0;
      sen.corrompu = false;
      sen.ancienConsul = false;
      return sen;
    });
    this._pioche = this._pioche.concat(senateurs);
    this._pioche = this._pioche.concat(hommesEtat);
    this._pioche = this._pioche.concat(CONCESSIONS);
    this._pioche = this._pioche.concat(CHEFS_ENNEMIS);
    this._pioche = this._pioche.concat(INTRIGUES);
    const guerres = GUERRES;
    let gi: number;
    const gp = guerres.find((g: Guerre, idx: number, array) => {
      gi = idx;
      return g.id === GuerreId.PUNIQUE1;
    });
    this.ajouterForum(gp);
    guerres.splice(gi, 1);
    this._pioche = this._pioche.concat(guerres);

    this.provinces = PROVINCES;
    const forcesActives: Legion[] = [];
    for (let index = 1; index < 5; index++) {
      forcesActives.push({ id: index, veteran: false });
    }
    this.forcesActives.next(forcesActives);
  }

  /**
   * Renvoie un nb aléatoire compris entre min et max inclus
   * @param n: number
   */
  getRandomNumber(max: number, min: number = 1, mod: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min + mod;
  }

  getRandomSenateurs(nb: number): Senateur[] {
    const newSens = [];
    for (let index = 0; index < nb; index++) {
      const sen = this.prendreDansPioche(TypeCarte.SENATEUR);
      newSens.push(sen);
    }
    return newSens;
  }

  // TMP Tests
  public prendreProvince(): Province {
    let fc: Carte[];
    while (!fc) {
      const idx = this.getRandomNumber(this.provinces.length) - 1;
        fc = this.provinces.splice(idx, 1);
    }
    return fc[0] as Province;
  }
  public prendreDansPioche(type?: TypeCarte): Carte {
    let fc: Carte[];
    while (!fc) {
      const idx = this.getRandomNumber(this._pioche.length) - 1;
      if (!type || this._pioche[idx].type === type) {
        fc = this._pioche.splice(idx, 1);
      }
    }
    return fc[0];
  }

  public remettreDansPioche(c: Carte) {
    this._pioche.push(c);
  }

  public getTresor(): Observable<number> {
    return this.tresor.asObservable();
  }
  public majTresor(t: number) {
    let tresor = this.tresor.getValue();
    tresor += t;
    this.tresor.next(tresor);
  }
  public getProvinces(): Carte[] {
    return this.provinces;
  }
  public getForcesActives(): Observable<Legion[]> {
    return this.forcesActives.asObservable();
  }
  public getChefsEnnemis(): Observable<Carte[]> {
    return this.chefsEnnemis.asObservable();
  }
  public getReleveSenatoriale(): Observable<Carte[]> {
    return this.releveSenatoriale.asObservable();
  }
  public getConcessionsDetruites(): Observable<Carte[]> {
    return this.concessionsDetruites.asObservable();
  }
  public addConcessionDetruite(cd: Carte) {
    const cds = this.concessionsDetruites.getValue();
    cds.push(cd);

    this.concessionsDetruites.next(cds);
  }

  public getForum(): Observable<Carte[]> {
    return this.forum.asObservable();
  }
  public ajouterForum(c: Carte) {
    const forum = this.forum.getValue();
    forum.push(c);
    this.forum.next(forum);
  }
  public prendreForum(c: Carte) {
    const forum = this.forum.getValue();
    const idx = forum.findIndex((cf: Carte) => cf.nom === c.nom);
    forum.splice(idx, 1);
    this.forum.next(forum);
  }

  public senateurApparenteHE(he: Senateur): Senateur {
    const trouve = this.forum.getValue().find((cf: Carte) => {
      if (cf.type === TypeCarte.SENATEUR) {
        const sen = cf as Senateur;
        return sen.in === he.in;
      } else {
        return false;
      }
    });
    return trouve as Senateur;
  }
}
