import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MainComponent } from "./main.component";
import { routing } from "./main.routing";
import { HeaderComponent } from "./components/header/header.component";
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonCardComponent } from './components/pokemon-list/components/pokemon-card/pokemon-card.component';

@NgModule({
  imports: [
    CommonModule,
    routing,

    //Angular Material
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [MainComponent, HeaderComponent, PokemonListComponent, PokemonCardComponent]
})
export class MainModule {}
