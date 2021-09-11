import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PokemonBasicInfo } from "../models/pokemon";

@Injectable()
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  public getPokemons(): Observable<PokemonBasicInfo[]> {
    const url =
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";

    return this.httpClient.get<PokemonBasicInfo[]>(url);
  }
}
