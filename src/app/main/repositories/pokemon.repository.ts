import { Injectable } from "@angular/core";
import { IPokemonInfo } from "./../models/";

@Injectable({
  providedIn: "root"
})
export class PokemonRepository {
  private _pokemons: IPokemonInfo[] = [];
  private pokemonIndexByNum: { [key: string]: IPokemonInfo } = {};

  get pokemons(): IPokemonInfo[] {
    return this._pokemons;
  }

  public savePokemons(...value: IPokemonInfo[]): void {
    value.forEach(item => {
      const index = this._pokemons.findIndex(x => x.id === item.id);
      if (index !== -1) {
        this._pokemons[index] = item;
      } else {
        this._pokemons.push(item);
      }
    });

    this._pokemons.forEach(item => (this.pokemonIndexByNum[item.num] = item));
  }
}
