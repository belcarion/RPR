import { Component, ViewChild } from "@angular/core";
import { MatToolbar } from "@angular/material/toolbar";
import { PhasesComponent } from "./components/phases/phases.component";
import { RomeComponent } from "./components/rome/rome.component";
import { FactionsComponent } from "./components/factions/factions.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    imports: [MatToolbar, PhasesComponent, RomeComponent, FactionsComponent]
})
export class AppComponent {
  title = "RPR";
}
