import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { PokemonInfo, PokemonListResponse } from "../models/pokemon";

@Injectable()
export class PokemonService {
  private _pokemons: PokemonInfo[] = [];
  private searchTerm = "";

  get pokemons(): PokemonInfo[] {
    return this._pokemons.filter(item => {
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase().trim();
        const name = item.name.toLowerCase().trim();
        const number = item.num.trim();
        if (name.includes(term) || number.includes(term)) return item;
      } else return item;
    });
  }
  constructor(private httpClient: HttpClient) {}

  public getPokemons(): Observable<PokemonListResponse> {
    const url =
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";

    return this.httpClient.get<PokemonListResponse>(url).pipe(
      tap(resp => {
        this._pokemons = resp.pokemon;
      })
    );
  }

  public updateSearchTerm(value: string): void {
    this.searchTerm = value;
  }
}
