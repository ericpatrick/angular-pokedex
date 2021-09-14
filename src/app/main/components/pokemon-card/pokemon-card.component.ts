import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { IPokemonInfo } from "../../models";
import { ImageObserverService } from "../../services";

@Component({
  selector: "app-pokemon-card",
  templateUrl: "./pokemon-card.component.html",
  styleUrls: ["./pokemon-card.component.scss"]
})
export class PokemonCardComponent implements OnInit, AfterViewInit {
  @Input()
  public pokemonInfo: IPokemonInfo;

  @ViewChild("pokemonImg")
  public pokemonImg: ElementRef<HTMLImageElement>;

  @ViewChild("pokemonCard", { read: ElementRef })
  public pokemonCard: ElementRef;

  constructor(private imageObserverService: ImageObserverService) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.imageObserverService.iObserver.observe(this.pokemonImg.nativeElement);
  }

  public onLoadImage(event): void {
    const imgPath = event.path[0].getAttribute("src");
    this.imageObserverService.removeImage(imgPath);
    this.pokemonCard.nativeElement.style.visibility = "visible";
  }
}
