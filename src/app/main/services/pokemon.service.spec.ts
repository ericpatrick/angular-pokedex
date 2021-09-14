import { PokemonListResponse } from "./../models/pokemon";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { PokemonService } from ".";
import { pokemonsFixture } from "../fixtures/pokemon.fixture";
import { PokemonRepository } from "../repositories/pokemon.repository";
import { skip } from "rxjs/operators";

describe("AgendaService", () => {
  let httpTestingController: HttpTestingController;
  let pokemonService: PokemonService;
  let pokemonRepository: PokemonRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService, PokemonRepository]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    pokemonService = TestBed.inject(PokemonService);
    pokemonRepository = TestBed.inject(PokemonRepository);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  test("should be created", () => {
    expect(PokemonService).toBeTruthy();
  });

  test("should get pokemons", fakeAsync(() => {
    const url =
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";

    pokemonService.pokemons$.subscribe(pokemons => {
      expect(pokemons).not.toBeNull();
      expect(pokemons.length).toEqual(pokemonsFixture.length);

      for (let i = 0; i < pokemons.length; i++) {
        expect(pokemons[i].id).toEqual(pokemonsFixture[i].id);
        expect(pokemons[i].num).toEqual(pokemonsFixture[i].num);
        expect(pokemons[i].name).toEqual(pokemonsFixture[i].name);
        expect(pokemons[i].img).toEqual(pokemonsFixture[i].img);
        expect(pokemons[i].type).toEqual(pokemonsFixture[i].type);

        const pokemonFromRepository = pokemonRepository.findByNum(
          pokemons[i].num
        );
        expect(pokemonFromRepository).not.toBeNull();
      }
    });

    pokemonService.getPokemons();

    const req = httpTestingController.expectOne(url);
    const fixture: PokemonListResponse = {
      pokemon: pokemonsFixture
    };
    expect(req.request.method).toEqual("GET");
    req.flush(fixture);

    tick();
  }));

  test("should filter pokemons", fakeAsync(() => {
    const url =
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";
    const searchTerm = "Charmeleon";

    pokemonService.pokemons$.pipe(skip(1)).subscribe(pokemons => {
      expect(pokemons).not.toBeNull();
      expect(pokemons.length).toEqual(1);
      expect(pokemons[0].name).toContain(searchTerm);
    });

    pokemonService.getPokemons();

    const req = httpTestingController.expectOne(url);
    const fixture: PokemonListResponse = {
      pokemon: pokemonsFixture
    };
    expect(req.request.method).toEqual("GET");
    req.flush(fixture);

    tick();

    pokemonService.updateSearchTerm(searchTerm);
  }));
});
