import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { PokemonInfo } from "src/app/main/models/pokemon";

@Component({
  selector: "app-pokemon-card",
  templateUrl: "./pokemon-card.component.html",
  styleUrls: ["./pokemon-card.component.scss"]
})
export class PokemonCardComponent implements OnInit, AfterViewInit {
  @Input()
  public pokemonInfo: PokemonInfo;

  @Input()
  public iObserver: IntersectionObserver;

  @ViewChild("pokemonImg")
  public pokemonImg: ElementRef<HTMLImageElement>;

  @ViewChild("pokemonCard", { read: ElementRef })
  public pokemonCard: ElementRef;

  constructor() {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.iObserver.observe(this.pokemonImg.nativeElement);
  }

  public onLoadImage(): void {
    this.pokemonCard.nativeElement.style.visibility = "visible";
  }
}
