import { Senateur, TypeIntrigue, TypeCarte, Intrigue, Concession, Guerre, Province, ChefEnnemi } from '../data.interface';

export const CONCESSIONS: Concession[] = [
  {nom: 'Perception des fermages 1', revenu: 2, type: TypeCarte.CONCESSION},
  {nom: 'Perception des fermages 2', revenu: 2, type: TypeCarte.CONCESSION},
  {nom: 'Perception des fermages 3', revenu: 2, type: TypeCarte.CONCESSION},
  {nom: 'Perception des fermages 4', revenu: 2, type: TypeCarte.CONCESSION},
  {nom: 'Perception des fermages 5', revenu: 2, type: TypeCarte.CONCESSION},
  {nom: 'Perception des fermages 6', revenu: 2, type: TypeCarte.CONCESSION},
  {nom: 'Exploitation des mines', revenu: 3, type: TypeCarte.CONCESSION},
  {nom: 'Armateur de la flotte', revenu: 3, type: TypeCarte.CONCESSION},
  {nom: 'Commission à l\'agriculture', revenu: 3, type: TypeCarte.CONCESSION},
  {nom: 'Fournisseur aux armées', revenu: 2, type: TypeCarte.CONCESSION},
  {nom: 'Contrôle des taxes portuaires', revenu: 3, type: TypeCarte.CONCESSION},
  {nom: 'Gestion des blés Egyptiens', revenu: 5, type: TypeCarte.CONCESSION},
  {nom: 'Gestion des blés Siciliens', revenu: 4, type: TypeCarte.CONCESSION}
];

export const INTRIGUES: Intrigue[] = [
  { intrigue: TypeIntrigue.TRIBUN, nom: 'Intercession d\'un tribun', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.TRIBUN, nom: 'Intercession d\'un tribun', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.TRIBUN, nom: 'Intercession d\'un tribun', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.TRIBUN, nom: 'Intercession d\'un tribun', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.TRIBUN, nom: 'Intercession d\'un tribun', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.TRIBUN, nom: 'Intercession d\'un tribun', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.TRIBUN, nom: 'Intercession d\'un tribun', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.TRIBUN, nom: 'Intercession d\'un tribun', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.TRIBUN, nom: 'Intercession d\'un tribun', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.INTRIGUE_D_ALCOVE, nom: 'Intrigue d\'alcove', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.TRAFIC_D_INFLUENCE, nom: 'Trafic d\'influence', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.ESCORTE_SECRETE, nom: 'Escorte secrète', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.ASSASSINAT, nom: 'Assassinat populaire', type: TypeCarte.INTRIGUE},
  { intrigue: TypeIntrigue.CHANTAGE, nom: 'Chantage', type: TypeCarte.INTRIGUE}
];

export const SENATEURS: Senateur[] = [
  { nom: 'CORNELIUS', in: 1, militaire: 4, eloquence: 3, loyaute: 9, influence: 5, type: TypeCarte.SENATEUR},
  { nom: 'FABIUS', in: 2, militaire: 4, eloquence: 2, loyaute: 9, influence: 5, type: TypeCarte.SENATEUR},
  { nom: 'VALERIUS', in: 3, militaire: 1, eloquence: 2, loyaute: 10, influence: 5, type: TypeCarte.SENATEUR},
  { nom: 'JULIUS', in: 4, militaire: 4, eloquence: 3, loyaute: 9, influence: 4, type: TypeCarte.SENATEUR},
  { nom: 'CLAUDIUS', in: 5, militaire: 2, eloquence: 3, loyaute: 7, influence: 4, type: TypeCarte.SENATEUR},
  { nom: 'MANLIUS', in: 6, militaire: 3, eloquence: 2, loyaute: 7, influence: 4, type: TypeCarte.SENATEUR},
  { nom: 'FULVIUS', in: 7, militaire: 2, eloquence: 2, loyaute: 8, influence: 4, type: TypeCarte.SENATEUR},
  { nom: 'FURIUS', in: 8, militaire: 3, eloquence: 3, loyaute: 8, influence: 3, type: TypeCarte.SENATEUR},
  { nom: 'AURELIUS', in: 9, militaire: 2, eloquence: 3, loyaute: 7, influence: 3, type: TypeCarte.SENATEUR},
  { nom: 'JUNIUS', in: 10, militaire: 1, eloquence: 2, loyaute: 8, influence: 3, type: TypeCarte.SENATEUR},
  { nom: 'PAPIRIUS', in: 11, militaire: 1, eloquence: 2, loyaute: 6, influence: 3, type: TypeCarte.SENATEUR},
  { nom: 'ACILIUS', in: 12, militaire: 2, eloquence: 2, loyaute: 7, influence: 3, type: TypeCarte.SENATEUR},
  { nom: 'FLAMINIUS', in: 13, militaire: 4, eloquence: 2, loyaute: 6, influence: 3, type: TypeCarte.SENATEUR},
  { nom: 'AELIUS', in: 14, militaire: 3, eloquence: 4, loyaute: 7, influence: 2, type: TypeCarte.SENATEUR},
  { nom: 'SULPICIUS', in: 15, militaire: 3, eloquence: 2, loyaute: 8, influence: 2, type: TypeCarte.SENATEUR},
  { nom: 'CALPURNIUS', in: 16, militaire: 1, eloquence: 2, loyaute: 9, influence: 2, type: TypeCarte.SENATEUR},
  { nom: 'PLAUTIUS', in: 17, militaire: 2, eloquence: 1, loyaute: 6, influence: 2, type: TypeCarte.SENATEUR},
  { nom: 'QUINCTIUS', in: 18, militaire: 3, eloquence: 2, loyaute: 6, influence: 1, type: TypeCarte.SENATEUR},
  { nom: 'AEMILIUS', in: 19, militaire: 4, eloquence: 2, loyaute: 8, influence: 1, type: TypeCarte.SENATEUR},
  { nom: 'TERENTIUS', in: 20, militaire: 2, eloquence: 1, loyaute: 6, influence: 1, type: TypeCarte.SENATEUR}
];

export enum ProvinceId {
  'SICILE',
  'CORSE_SARDAIGNE',
  'ESPAGNE_ULTERIEURE',
  'ESPAGNE_CITERIEURE',
  'ILLYRIE',
  'GAULE_CISALPINE'
}
export const PROVINCES: Province[] = [
  { id: ProvinceId.SICILE, nom: 'SICILE (-241)', forceMilitaire: [2, 2], forceNavale: [0, 0],
    spoliation: [0, 4], revenusEtat: [-2, 2], developee: 0, type: TypeCarte.PROVINCE},
  { id: ProvinceId.CORSE_SARDAIGNE, nom: 'CORSE & SARDAIGNE (-231)', forceMilitaire: [0, 2], forceNavale: [0, 5],
    spoliation: [-5, -1], revenusEtat: [-8, -6], developee: 0, type: TypeCarte.PROVINCE},
    { id: ProvinceId.ESPAGNE_ULTERIEURE, nom: 'ESPAGNE ULTERIEURE (-197)', forceMilitaire: [2, 4], forceNavale: [0, 0],
    spoliation: [-3, 1], revenusEtat: [-8, -1], developee: 0, type: TypeCarte.PROVINCE},
    { id: ProvinceId.ESPAGNE_CITERIEURE, nom: 'ESPAGNE CITERIEURE (-197)', forceMilitaire: [2, 2], forceNavale: [0, 0],
    spoliation: [-2, 2], revenusEtat: [-6, 1], developee: 0, type: TypeCarte.PROVINCE},
    { id: ProvinceId.ILLYRIE, nom: 'ILLYRIE (-167)', forceMilitaire: [2, 4], forceNavale: [0, 0],
    spoliation: [-3, 0], revenusEtat: [-8, 0], developee: 0, type: TypeCarte.PROVINCE},
    { id: ProvinceId.GAULE_CISALPINE, nom: 'GAULE CISALPINE (-81)', forceMilitaire: [1, 2], forceNavale: [0, 0],
    spoliation: [-1, 3], revenusEtat: [-1, -1], developee: 0, type: TypeCarte.PROVINCE},
];

export enum GuerreId {
  'PUNIQUE1',
  'PUNIQUE2',
  'ILLYRIENNE1',
  'ILLYRIENNE2',
  'GAULOISE1',
  'MACEDONIENNE1',
  'MACEDONIENNE2',
  'SYRIENNE'
}
export const GUERRES: Guerre[] = [
  { id: GuerreId.PUNIQUE1, nom: '1ère GUERRE PUNIQUE (-264 à -241)', forcesTerrestres: 10, soutienNaval: 5, forcesNavales: 10,
    conflitsApparentes: [GuerreId.PUNIQUE2], desastre: 13, retraite: [11, 14], butin: 35, active: false,
    provincesCreees: [ProvinceId.SICILE, ProvinceId.CORSE_SARDAIGNE], type: TypeCarte.GUERRE },
    // Pas de butin si 3e a été vaincue
    { id: GuerreId.PUNIQUE2, nom: '2ème GUERRE PUNIQUE (-218 à -201)', forcesTerrestres: 15, soutienNaval: 5, forcesNavales: 0,
    conflitsApparentes: [GuerreId.PUNIQUE2], desastre: 10, retraite: [11, 15], butin: 25, active: true,
    provincesCreees: [ProvinceId.ESPAGNE_CITERIEURE, ProvinceId.ESPAGNE_ULTERIEURE], type: TypeCarte.GUERRE },
    // Ruine perception des fermages
    // Pas de butin si 3e a été vaincue
    { id: GuerreId.ILLYRIENNE1, nom: '1ère GUERRE ILLYRIENNE (-229 à -228)', forcesTerrestres: 5, soutienNaval: 3, forcesNavales: 0,
    conflitsApparentes: [GuerreId.ILLYRIENNE2], desastre: 5, retraite: [17], butin: 10, active: false,
    provincesCreees: [ProvinceId.ILLYRIE], type: TypeCarte.GUERRE },
    // Pas de butin si 2e a été vaincue
    // création province si 1 et 2 vaincues
    { id: GuerreId.ILLYRIENNE2, nom: '2ème GUERRE ILLYRIENNE (-220 à -219)', forcesTerrestres: 4, soutienNaval: 2, forcesNavales: 0,
    conflitsApparentes: [GuerreId.ILLYRIENNE2], desastre: 5, retraite: [17], butin: 10, active: true,
    provincesCreees: [ProvinceId.ILLYRIE], type: TypeCarte.GUERRE },
    // Pas de butin si 2e a été vaincue
    { id: GuerreId.GAULOISE1, nom: '1ère GUERRE GAULOISE (-225 à -222)', forcesTerrestres: 10, soutienNaval: 0, forcesNavales: 0,
    conflitsApparentes: [], desastre: 13, retraite: [15], butin: 20, active: true,
    provincesCreees: [ProvinceId.GAULE_CISALPINE], type: TypeCarte.GUERRE },
    // Pas de butin si 3e a été vaincue
    { id: GuerreId.MACEDONIENNE1, nom: '1ère GUERRE MACEDONIENNE (-215 à -205)', forcesTerrestres: 12, soutienNaval: 10, forcesNavales: 0,
    conflitsApparentes: [GuerreId.MACEDONIENNE2], desastre: 12, retraite: [11, 18], butin: 25, active: true,
    provincesCreees: [], type: TypeCarte.GUERRE },
    // Pas de butin si 4e a été vaincue
    { id: GuerreId.MACEDONIENNE2, nom: '2ème GUERRE MACEDONIENNE (-200 à -196)', forcesTerrestres: 10, soutienNaval: 2, forcesNavales: 0,
    conflitsApparentes: [GuerreId.MACEDONIENNE1], desastre: 13, retraite: [14], butin: 45, active: false,
    provincesCreees: [], type: TypeCarte.GUERRE }
    // Pas de butin si 4e a été vaincue
];
export const CHEFS_ENNEMIS: ChefEnnemi[] = [
  { nom: 'HAMILCAR BARCA, SUFFETE DE CARTHAGE (? à -229)', desastre: 8, retraite: 12,
    guerres: [GuerreId.PUNIQUE1, GuerreId.PUNIQUE2], type: TypeCarte.CHEFENNEMI},
    { nom: 'HANNIBAL BARCA, SUFFETE DE CARTHAGE (-242 à -183)', desastre: 9, retraite: 16,
    guerres: [GuerreId.PUNIQUE1, GuerreId.PUNIQUE2], type: TypeCarte.CHEFENNEMI},
    { nom: 'Philippe V, Roi de Macédoine', desastre: 15, retraite: 14,
    guerres: [GuerreId.MACEDONIENNE1, GuerreId.MACEDONIENNE2], type: TypeCarte.CHEFENNEMI},
    { nom: 'ANTIOCHOS III MEGAS, ROI DE SYRIE (-242 à -187)', desastre: 14, retraite: 17,
    guerres: [GuerreId.SYRIENNE], type: TypeCarte.CHEFENNEMI},
];
