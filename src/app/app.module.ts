import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { FactionComponent } from './components/faction/faction.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConcessionComponent } from './components/cartes/concession/concession.component';
import { ProvinceComponent } from './components/cartes/province/province.component';
import { FactionsComponent } from './components/factions/factions.component';
import { RomeComponent } from './components/rome/rome.component';
import { PhasesComponent } from './components/phases/phases.component';
import { ForumComponent } from './components/forum/forum.component';
import { PhaseRevenuComponent } from './components/phases/phase-revenu/phase-revenu.component';
import { PhaseMortaliteComponent } from './components/phases/phase-mortalite/phase-mortalite.component';
import { PhaseForumComponent } from './components/phases/phase-forum/phase-forum.component';

@NgModule({
  declarations: [
    AppComponent,
    FactionComponent,
    ConcessionComponent,
    ProvinceComponent,
    FactionsComponent,
    RomeComponent,
    PhasesComponent,
    ForumComponent,
    PhaseRevenuComponent,
    PhaseMortaliteComponent,
    PhaseForumComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
