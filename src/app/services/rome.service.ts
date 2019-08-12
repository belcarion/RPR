import { Injectable } from '@angular/core';
import { SENATEURS, HOMMESDETAT } from '../data/senateurs.data';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  Senateur,
  Carte,
  TypeCarte,
  Guerre,
  Province,
  Legion,
  Charge,
  Escadre
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
  private _chefsEnnemis: BehaviorSubject<Carte[]> = new BehaviorSubject<Carte[]>(
    []
  );
  private _releveSenatoriale: BehaviorSubject<Senateur[]> = new BehaviorSubject<
    Senateur[]
  >([]);
  private _concessionsDetruites: BehaviorSubject<Carte[]> = new BehaviorSubject<
    Carte[]
  >([]);
  private _tresor: BehaviorSubject<number> = new BehaviorSubject<number>(100);
  private _forum: BehaviorSubject<Carte[]> = new BehaviorSubject<Carte[]>([]);
  private _provinces: BehaviorSubject<Province[]> = new BehaviorSubject<Province[]>([]);
  private _legionsActives: BehaviorSubject<Legion[]> = new BehaviorSubject<Legion[]>([]);
  private _escadresActives: BehaviorSubject<Escadre[]> = new BehaviorSubject<Escadre[]>([]);
  private _guerresActives: BehaviorSubject<Guerre[]> = new BehaviorSubject<Guerre[]>([]);


  constructor() {
    const senateurs: Senateur[] = SENATEURS.map((sen: Senateur) => {
      sen.concessions = [];
      sen.chevaliers = 0;
      sen.tresor = 0;
      sen.popularite = 0;
      sen.corrompu = false;
      sen.ancienConsul = false;
      sen.rebelle = false;
      sen.charge = Charge.SANS;
      return sen;
    });
    const hommesEtat: Senateur[] = HOMMESDETAT.map((sen: Senateur) => {
      sen.concessions = [];
      sen.chevaliers = 0;
      sen.tresor = 0;
      sen.popularite = 0;
      sen.corrompu = false;
      sen.ancienConsul = false;
      sen.rebelle = false;
      sen.charge = Charge.SANS;
      return sen;
    });
    this._pioche = this._pioche.concat(senateurs);
    this._pioche = this._pioche.concat(hommesEtat);
    this._pioche = this._pioche.concat(CONCESSIONS);
    this._pioche = this._pioche.concat(CHEFS_ENNEMIS);
    this._pioche = this._pioche.concat(INTRIGUES);
    this._provinces.next(PROVINCES);

    const guerres = GUERRES;
    let gi: number;
    const gp = guerres.find((g: Guerre, idx: number, array) => {
      gi = idx;
      return g.id === GuerreId.PUNIQUE1;
    });
    this.ajouterForum(gp);
    guerres.splice(gi, 1);
    this._pioche = this._pioche.concat(guerres);

    const legionsActives: Legion[] = [];
    for (let index = 1; index < 5; index++) {
      legionsActives.push({ id: index, veteran: false, rebelle: false });
    }
    this._legionsActives.next(legionsActives);
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
    const provinces = this._provinces.getValue();
    while (!fc) {
      const idx = this.getRandomNumber(provinces.length) - 1;
        fc = provinces.splice(idx, 1);
    }
    this._provinces.next(provinces);
    const prov = fc[0] as Province;
    prov.mandat = 3;
    return prov;
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
    return this._tresor.asObservable();
  }
  public majTresor(t: number) {
    let tresor = this._tresor.getValue();
    tresor += t;
    this._tresor.next(tresor);
  }
  public getProvinces(): Observable<Carte[]> {
    return this._provinces.asObservable();
  }
  public developpeProvince(province: Province) {
    const provinces = this._provinces.getValue();
    const pf: Province = provinces.find((p: Province) => {
      return p.nom === province.nom;
    });
    if (pf) {
      pf.developpee = 1;
    }
    this._provinces.next(provinces);
  }
  public getLegionsActives(): Observable<Legion[]> {
    return this._legionsActives.asObservable();
  }
  public getEscadresActives(): Observable<Escadre[]> {
    return this._escadresActives.asObservable();
  }
  public getChefsEnnemis(): Observable<Carte[]> {
    return this._chefsEnnemis.asObservable();
  }
  public getReleveSenatoriale(): Observable<Senateur[]> {
    return this._releveSenatoriale.asObservable();
  }
  public addReleveSenatoriale(c: Senateur) {
    const rs = this._releveSenatoriale.getValue();
    rs.push(c);
    this._releveSenatoriale.next(rs);
  }
  public getConcessionsDetruites(): Observable<Carte[]> {
    return this._concessionsDetruites.asObservable();
  }
  public addConcessionDetruite(cd: Carte) {
    const cds = this._concessionsDetruites.getValue();
    cds.push(cd);
    this._concessionsDetruites.next(cds);
  }

  public getForum(): Observable<Carte[]> {
    return this._forum.asObservable();
  }
  public ajouterForum(c: Carte) {
    const forum = this._forum.getValue();
    forum.push(c);
    this._forum.next(forum);
  }
  public prendreForum(c: Carte) {
    const forum = this._forum.getValue();
    const idx = forum.findIndex((cf: Carte) => cf.nom === c.nom);
    forum.splice(idx, 1);
    this._forum.next(forum);
  }

  public senateurApparenteHE(he: Senateur): Senateur {
    const trouve = this._forum.getValue().find((cf: Carte) => {
      if (cf.type === TypeCarte.SENATEUR) {
        const sen = cf as Senateur;
        return sen.in === he.in;
      } else {
        return false;
      }
    });
    return trouve as Senateur;
  }

  public dettes(): string[] {
    const cga = -20 * this._guerresActives.getValue().length;
    const la = this._legionsActives.getValue().filter((l: Legion) => !l.rebelle).length;
    const ea = this._escadresActives.getValue().filter((e: Escadre) => !e.rebelle).length;
    const cfa = -2 * (la + ea);
    this.majTresor(cga);
    this.majTresor(cfa);
    // lois agraires*
    return ['Rome paie ' + cga + ' T pour les guerres actives, '
    + cfa + ' T pour les forces non rebelles.'];
  }
}
