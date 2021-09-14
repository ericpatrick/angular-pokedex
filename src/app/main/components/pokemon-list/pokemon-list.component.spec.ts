import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { ImageObserverService, PokemonService } from "../../services";
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { PokemonTypesComponent } from "../pokemon-types/pokemon-types.component";

import { PokemonListComponent } from "./pokemon-list.component";

describe("PokemonListComponent", () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;

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
      declarations: [
        PokemonListComponent,
        PokemonCardComponent,
        PokemonTypesComponent
      ],
      imports: [
        MatCardModule,
        HttpClientTestingModule,
        ToastrModule.forRoot({
          positionClass: "toast-bottom-center",
          preventDuplicates: true
        })
      ],
      providers: [PokemonService, ToastrService, ImageObserverService]
    }).compileComponents();
  });

  beforeEach(() => {
    setupIntersectionObserverMock();
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
