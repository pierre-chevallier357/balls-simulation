import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { Balle } from "../PhysiqueDefs";
import { PhysiqueService } from "../physique.service";

@Component({
  selector: "app-balle-details",
  templateUrl: "./balle-details.component.html",
  styleUrls: ["./balle-details.component.scss"],
})
export class BalleDetailsComponent implements OnInit {
  @Input() balle: Balle;

  constructor(private ps: PhysiqueService, private el: ElementRef) {
    console.log(el);
  }

  ngOnInit() {}

  updateR(balle: Balle, r: number) {
    this.ps.updateR(balle, r);
  }

  remove() {
    this.ps.removeBalle(this.balle);
  }

  check() {
    this.ps.check(this.balle);
  }
}
