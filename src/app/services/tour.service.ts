import { Injectable } from "@angular/core";

export enum Phase {
  MORTALITE = "Phase de mortalité",
  REVENU = "Phase de revenu",
  FORUM = "Phase de forum",
  PLEBE = "Phase de plèbe",
  SENAT = "Phase de sénat",
  COMBAT = "Phase de combat",
  GUERRE_CIVILE = "Phase de guerre civile"
}

@Injectable({
  providedIn: "root"
})
export class TourService {
  private tour = 1;
  private conditionDeFin = false;

  constructor() {}
}
