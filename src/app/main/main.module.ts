import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";

import { MainComponent } from "./main.component";
import { routing } from "./main.routing";
import { HeaderComponent } from "./components/header/header.component";
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list.component";
import { PokemonCardComponent } from "./components/pokemon-card/pokemon-card.component";
import { PokemonService, ImageObserverService } from "./services";
import { PokemonTypesComponent } from "./components/pokemon-types/pokemon-types.component";

@NgModule({
  imports: [
    // Angular Modules
    CommonModule,
    routing,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    //Angular Material
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: [
    MainComponent,
    HeaderComponent,
    PokemonListComponent,
    PokemonCardComponent,
    PokemonTypesComponent
  ],
  providers: [PokemonService, ImageObserverService]
})
export class MainModule {}
