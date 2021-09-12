import { Injectable } from "@angular/core";

import { ReplaySubject } from "rxjs";

import { ImageIntersected } from "../models";

@Injectable()
export class ImageObserverService {
  public iObserver: IntersectionObserver;
  public imageIntersected: ImageIntersected[] = [];
  public imageIntersectedIndexedByNum: { [key: string]: ImageIntersected } = {};
  public imageLoagind = new ReplaySubject<boolean>(1);
  private isFirstIntersection = true;
  public imageAmountOnViewport = 0;

  constructor() {
    this.iObserver = new IntersectionObserver((entries, self) => {
      if (this.isFirstIntersection) {
        this.imageAmountOnViewport = entries.length;
      }
      let hasimgIntersected = false;
      entries.forEach(entry => {
        const img = entry.target.getAttribute("data-src");
        const num = entry.target.getAttribute("data-num");

        if (entry.isIntersecting) {
          entry.target.setAttribute("src", img);

          const imgIntersected = { num, img };

          this.imageIntersected.push(imgIntersected);
          if (this.imageIntersected.length === 1) {
            this.imageLoagind.next(true);
            this.imageIntersectedIndexedByNum = {};
            hasimgIntersected = true;
          }

          this.imageIntersectedIndexedByNum[num] = imgIntersected;

          self.unobserve(entry.target);
        }
      });

      if (this.isFirstIntersection) {
        this.imageAmountOnViewport = this.imageIntersected.length;
      }
      this.isFirstIntersection = false;

      if (hasimgIntersected) {
        //Encerra a primeira parte da atualização: Descoberta de quantas imagens mostrar na tela
        this.imageLoagind.next(false);

        // Inicia a segunda parte do carregamento: Aguardar o carregamento das imagens
        this.imageLoagind.next(true);
      }
    });
  }

  public removeImage(path: string): void {
    const index = this.imageIntersected.findIndex(x => x.img === path);
    if (index !== -1) {
      this.imageIntersected.splice(index, 1);

      if (this.imageIntersected.length === 0) this.imageLoagind.next(false);
    }
  }
}
