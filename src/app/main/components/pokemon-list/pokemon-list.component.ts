import { Component, OnInit } from "@angular/core";

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

import { IPokemonInfo } from "../../models/";
import { ImageObserverService, PokemonService } from "../../services";

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"]
})
export class PokemonListComponent implements OnInit {
  public pokemonList: IPokemonInfo[] = [];

  constructor(
    private pokemonService: PokemonService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private imageObserverService: ImageObserverService
  ) {
    this.imageObserverService.imageLoagind.subscribe(isLoading => {
      if (isLoading) this.showSpinner();
      else {
        this.updatePokemonList(this.pokemonService.pokemons);
        this.hideSpinner();
      }
    });
  }

  private showSpinner(): void {
    this.spinner.show("pokemonLoading");
  }

  private hideSpinner(): void {
    this.spinner.hide("pokemonLoading");
  }

  public ngOnInit(): void {
    this.showSpinner();
    this.pokemonService.pokemons$.subscribe(
      pokemons => {
        this.updatePokemonList(pokemons);
      },
      () => {
        this.toastr.error(
          "Desculpe, não conseguimos carregar sua pokedex. Pedimos para que tente novamente mais tarde."
        );
      },
      () => {
        this.hideSpinner();
      }
    );

    this.pokemonService.getPokemons();
  }

  private updatePokemonList(pokemons: IPokemonInfo[]): void {
    const keys = Object.keys(
      this.imageObserverService.imageIntersectedIndexedByNum
    );
    if (keys.length > 0) {
      const keysNumber = keys.map(x => parseInt(x, 10));
      const maxnum = Math.max(...keysNumber);
      const index = pokemons.findIndex(x => parseInt(x.num, 10) === maxnum);

      let notIntersected = pokemons.slice(index);
      const listOffset = this.imageObserverService.imageAmountOnViewport / 2;
      if (notIntersected.length > listOffset)
        notIntersected = notIntersected.slice(0, listOffset - 1);

      this.pokemonList = pokemons.slice(0, index).concat(notIntersected);
    } else this.pokemonList = pokemons;
  }
}
