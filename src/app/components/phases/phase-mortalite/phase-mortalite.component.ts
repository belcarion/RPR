import { Component, OnInit, inject, output } from '@angular/core';
import { PhaseMortaliteService } from 'src/app/services/phase-mortalite.service';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'app-phase-mortalite',
    templateUrl: './phase-mortalite.component.html',
    styleUrls: ['./phase-mortalite.component.scss'],
    imports: [MatButton]
})
export class PhaseMortaliteComponent implements OnInit {
  private phaseMortaliteService = inject(PhaseMortaliteService);

  readonly fin = output<boolean>();
  public result: string[] = [];

  ngOnInit() {
    this.result = this.phaseMortaliteService.resolutionMortalite();
  }

  public suivant() {
    this.fin.emit(true);
  }
}
