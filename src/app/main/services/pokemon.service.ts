import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { PokemonRepository } from "../repositories/pokemon.repository";
import { IPokemonInfo, PokemonListResponse } from "./../models";

@Injectable()
export class PokemonService {
  private searchTerm = "";
  public pokemons$ = new Subject<IPokemonInfo[]>();
  public pokemons: IPokemonInfo[] = [];

  constructor(
    private httpClient: HttpClient,
    private pokemonRepository: PokemonRepository
  ) {}

  public getPokemons(): void {
    const url =
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";

    this.httpClient
      .get<PokemonListResponse>(url)
      .pipe(
        tap(resp => {
          const pokemons = resp.pokemon;
          this.pokemonRepository.savePokemons(...pokemons);
          this.pokemons$.next(pokemons);
          this.pokemons = pokemons;
        }),
        catchError(err => {
          this.pokemons$.error(err);
          return throwError(err);
        })
      )
      .toPromise();
  }

  public updateSearchTerm(value: string): void {
    this.searchTerm = value;
    this.updatePokemons();
  }

  private updatePokemons(): void {
    const pokemons = this.pokemonRepository.pokemons.filter(item => {
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase().trim();
        const name = item.name.toLowerCase().trim();
        const number = item.num.trim();
        if (name.includes(term) || number.includes(term)) return item;
      } else return item;
    });

    this.pokemons$.next(pokemons);
    this.pokemons = pokemons;
  }
}
