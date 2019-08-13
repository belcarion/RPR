import { ProvinceId, GuerreId } from './data/cartes.data';

//////////////////////////
// Enums
export enum TypeCharge {
  SANS = '',
  CONSUL_DE_ROME = 'Consul de Rome',
  CONSUL_MILITAIRE = 'Consul militaire',
  MAITRE_DE_CAVALERIE = 'Maitre de cavalerie',
  DICTATEUR = 'Dictateur',
  CENSEUR = 'Censeur',
  PROCONSUL = 'Proconsul'
}
export enum TypeFaction {
  JOUEUR = 'joueur',
  IMPERIALISTES = 'Impérialistes',
  PLOUTOCRATES = 'Ploutocrates',
  CONSERVATEURS = 'Conservateurs',
  POPULISTES = 'Populistes'
}
export enum TypeCarte {
  INTRIGUE = 'intrigue',
  CONCESSION = 'concession',
  LOI = 'loi',
  HOMMEDETAT = 'hommedetat',
  SENATEUR = 'senateur',
  CONFLIT = 'conflit',
  CHEFENNEMI = 'chefennemi',
  GUERRE = 'guerre',
  PROVINCE = 'province'
}
export enum TypeIntrigue {
  INTRIGUE_D_ALCOVE,
  TRAFIC_D_INFLUENCE,
  TRIBUN,
  ESCORTE_SECRETE,
  ASSASSINAT,
  CHANTAGE
}
//////////////////////////
// Interfaces
export interface Faction {
  id?: TypeFaction;
  nom: string;
  votes?: number;
  senateurs?: Senateur[];
  chef?: number;
  cartes?: Carte[];
  tresor: number;
  suivant?: TypeFaction;
}

export interface Charge {
  rang: number;
  nom: TypeCharge;
}
export interface Carte {
  nom: string;
  type: TypeCarte;
}
export interface Senateur extends Carte {
  in: number;
  inA?: string;
  nom: string;
  eloquence: number;
  loyaute: number;
  loyauteNulle?: string[];
  militaire: number;
  influence: number;
  popularite?: number;
  chef?: boolean;
  corrompu?: boolean;
  tresor?: number;
  chevaliers?: number;
  charge?: Charge;
  ancienConsul?: boolean;
  concessions?: Concession[];
  province?: Province;
  rebelle?: boolean;
}
export interface Concession extends Carte {
  revenu: number;
}

export interface Province extends Carte {
  id: ProvinceId;
  forceMilitaire: number[]; // [ non dév, dév]
  forceNavale: number[]; // [ non dév, dév]
  developpee: number; // non dév = 0, dév = 1
  spoliation: number[]; // [mod non dév, mod dév]
  revenusEtat: number[]; // [mod non dév, mod dév]
  mandat?: number;
}
export interface Intrigue extends Carte {
  intrigue: TypeIntrigue;
}
export interface Guerre extends Carte {
  id: number;
  forcesTerrestres: number;
  soutienNaval: number;
  forcesNavales: number;
  conflitsApparentes: GuerreId[];
  retraite: number[];
  desastre: number;
  butin: number;
  provincesCreees: ProvinceId[];
  active: boolean;
}
export interface ChefEnnemi extends Carte {
  retraite: number;
  desastre: number;
  guerres: GuerreId[];
}

export interface Legion {
  id: number;
  veteran: boolean;
  rebelle: boolean;
}
export interface Escadre {
  id: number;
  rebelle: boolean;
}
export interface SenateurVulnerable {
  senateur: Senateur;
  tresorFaction: number;
  votesFaction: number;
}
