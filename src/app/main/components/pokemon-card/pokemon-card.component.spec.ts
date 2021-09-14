import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MatCardModule } from "@angular/material/card";

import { PokemonCardComponent } from "./pokemon-card.component";
import { pokemonsFixture } from "../../fixtures/pokemon.fixture";
import { ImageObserverService } from "../../services";
import { PokemonTypesComponent } from "../pokemon-types/pokemon-types.component";

describe("PokemonCardComponent", () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  function setupIntersectionObserverMock({
    root = null,
    rootMargin = "",
    thresholds = [],
    disconnect = () => null,
    observe = () => null,
    takeRecords = () => [],
    unobserve = () => null
  } = {}): void {
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | null = root;
      readonly rootMargin: string = rootMargin;
      readonly thresholds: ReadonlyArray<number> = thresholds;
      disconnect: () => void = disconnect;
      observe: (target: Element) => void = observe;
      takeRecords: () => IntersectionObserverEntry[] = takeRecords;
      unobserve: (target: Element) => void = unobserve;
    }

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver
    });

    Object.defineProperty(global, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent, PokemonTypesComponent],
      imports: [MatCardModule],
      providers: [ImageObserverService]
    }).compileComponents();
  });

  beforeEach(() => {
    setupIntersectionObserverMock();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    component.pokemonInfo = pokemonsFixture[0];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
