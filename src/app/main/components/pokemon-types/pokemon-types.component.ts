import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-pokemon-types",
  templateUrl: "./pokemon-types.component.html",
  styleUrls: ["./pokemon-types.component.scss"]
})
export class PokemonTypesComponent implements OnInit {
  @Input()
  public types: string[];

  constructor() {}

  ngOnInit(): void {}

  public getBgColorClass(type: string): string {
    return `background-color-${type.toLowerCase()}`;
  }
}
