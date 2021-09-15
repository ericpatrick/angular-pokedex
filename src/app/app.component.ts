import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public ngOnInit(): void {
    if ("serviceWorker" in navigator) {
      // Use the window load event to keep the page load performant
      navigator.serviceWorker.register("sw-custom.js");
    }
  }
}
