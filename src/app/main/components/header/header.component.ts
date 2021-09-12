import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../../services";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public searchTerm: string = "";

  constructor(private pokemonService: PokemonService) {}

  public ngOnInit(): void {}

  public updateTerm(): void {
    this.pokemonService.updateSearchTerm(this.searchTerm);
  }
}
