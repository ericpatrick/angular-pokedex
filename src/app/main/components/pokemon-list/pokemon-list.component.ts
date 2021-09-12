import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { take } from "rxjs/operators";
import { PokemonInfo } from "../../models/pokemon";
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"]
})
export class PokemonListComponent implements OnInit {
  public iObserver: IntersectionObserver;

  get pokemonList(): PokemonInfo[] {
    return this.pokemonService.pokemons;
  }
  constructor(
    private pokemonService: PokemonService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.pokemonService.getPokemons().subscribe(
      response => {
        // this.pokemonList = [response.pokemon[0]];
      },
      () => {
        this.toastr.error(
          "Desculpe, não conseguimos carregar sua pokedex. Pedimos para que tente novamente mais tarde."
        );
      },
      () => {
        this.spinner.hide();
      }
    );

    this.iObserver = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const imgPath = entry.target.getAttribute("data-src");
          entry.target.setAttribute("src", imgPath);

          self.unobserve(entry.target);
        }
      });
    });
  }
}
