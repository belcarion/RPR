import { Injectable } from "@angular/core";
import { FactionService } from "./faction.service";
import { RomeService } from './rome.service';

@Injectable({
  providedIn: "root"
})
export class PhaseMortaliteService {
  constructor(
    private factionService: FactionService,
    private romeService: RomeService) {}

  private testMortalite(): number[] {
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

  public resolutionMortalite(): string[] {
    const senateursMorts = this.testMortalite();
    console.log("sénateurs morts = ", JSON.stringify(senateursMorts));
    return this.factionService.retireSenateurMort(senateursMorts);
  }
}
