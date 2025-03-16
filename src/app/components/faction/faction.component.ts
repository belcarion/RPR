import { Component, OnInit, Input, inject } from '@angular/core';
import { Senateur, Faction } from 'src/app/data.interface';
import { FactionService } from 'src/app/services/faction.service';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { MatSelect } from '@angular/material/select';

import { MatOption } from '@angular/material/core';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { ConcessionComponent } from '../cartes/concession/concession.component';
import { ProvinceComponent } from '../cartes/province/province.component';

@Component({
    selector: 'app-faction',
    templateUrl: './faction.component.html',
    styleUrls: ['./faction.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    imports: [MatSelect, MatOption, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, ConcessionComponent, ProvinceComponent, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
})
export class FactionComponent implements OnInit {
  private factionService = inject(FactionService);


  @Input() faction: Faction;
  public tresor = 0;
  public influence = 0;
  public columnsToDisplay = ['nom', 'charge', 'militaire', 'loyaute', 'eloquence', 'influence', 'popularite', 'tresor', 'chevaliers'];

  ngOnInit() {
  }

  public isExpanded(element): string {
    const qq =  (element.concessions && element.concessions.length > 0) || element.province ? 'expanded' : 'collapsed';
    return (element.concessions && element.concessions.length > 0) || element.province ? 'expanded' : 'collapsed';
  }
}
