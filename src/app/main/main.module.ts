import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MainComponent } from "./main.component";
import { MatCardModule } from "@angular/material/card";
import { HttpClientModule } from "@angular/common/http";
import { routing } from "./main.routing";
import { HeaderComponent } from "./components/header/header.component";
import { PokemonListComponent } from "./components/pokemon-list/pokemon-list.component";
import { PokemonCardComponent } from "./components/pokemon-list/components/pokemon-card/pokemon-card.component";
import { PokemonService } from "./services/pokemon.service";
import { PokemonTypesComponent } from "./components/pokemon-types/pokemon-types.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    routing,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    //Angular Material
    MatInputModule,
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
  providers: [PokemonService]
})
export class MainModule {}
