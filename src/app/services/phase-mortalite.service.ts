import { Injectable } from "@angular/core";
import { Faction, Senateur } from "../data.interface";
import { FactionService } from "./faction.service";
import { RomeService } from './rome.service';

@Injectable({
  providedIn: "root"
})
export class PhaseMortaliteService {
  constructor(
    private factionService: FactionService,
    private romeService: RomeService) {}

  public testMortalite(): number[] {
    const sen = this.romeService.getRandomNumber(36);
    if (sen >= 31 && sen <= 34) {
      return [];
    } else {
      if (sen <= 30) {
        return [sen];
      } else {
        // 2 nouveaux tirages
        const sen2 = this.testMortalite();
        const sen3 = this.testMortalite();
        return sen2.concat(sen3);
      }
    }
  }

  public resolutionMortalite() {
    const senateursMorts = this.testMortalite();
    console.log("sénateurs morts = ", JSON.stringify(senateursMorts));
    this.factionService.retireSenateurMort(senateursMorts);
  }
}
