import { ProvinceId, GuerreId } from './data/cartes.data';

//////////////////////////
// Enums
export enum Charge {
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
  INTRIGUE,
  CONCESSION,
  LOI,
  HOMMEDETAT,
  SENATEUR,
  CONFLIT,
  CHEFENNEMI,
  GUERRE,
  PROVINCE
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
}
export interface Concession extends Carte {
  revenu: number;
}

export interface Province extends Carte {
  id: ProvinceId;
  forceMilitaire: number[]; // [ non dév, dév]
  forceNavale: number[]; // [ non dév, dév]
  developee: number; // non dév = 0, dév = 1
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
}
