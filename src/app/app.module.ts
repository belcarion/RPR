import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { FactionComponent } from './components/faction/faction.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConcessionComponent } from './components/concession/concession.component';
import { ProvinceComponent } from './components/province/province.component';
import { FactionsComponent } from './components/factions/factions.component';
import { RomeComponent } from './components/rome/rome.component';
import { PhasesComponent } from './components/phases/phases.component';
import { ForumComponent } from './components/forum/forum.component';

@NgModule({
  declarations: [
    AppComponent,
    FactionComponent,
    ConcessionComponent,
    ProvinceComponent,
    FactionsComponent,
    RomeComponent,
    PhasesComponent,
    ForumComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    ClarityModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
