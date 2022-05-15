import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PhysiqueService } from "./physique.service";
import { Balle } from "./PhysiqueDefs";
import { Observable } from "rxjs";
import { MatterService } from "./matter.service";
import { Body } from "matter-js";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private ps: PhysiqueService, private ms: MatterService) {}

  get G(): number {
    return this.ps.G;
  }

  set G(g: number) {
    this.ps.G = g;
  }

  get ballesObs(): Observable<Balle[]> {
    return this.ps.ballesObs;
  }

  get matterBodiesObs(): Observable<Body[]> {
    return this.ms.bodiesObs;
  }

  addBalle(evt: MouseEvent) {
    console.log(evt);
    const x = evt.offsetX;
    const y = this.W - evt.offsetY;
    this.ps.addBalle(x, y, 10, "#0000FF");
  }

  get W(): number {
    return this.ps.W;
  }

  get transfo(): string {
    return `scale(1, -1) translate(0, -${this.W})`;
  }

  getNbBalles(): number {
    return this.ps.getBalles().length;
  }

  points(b: Body): string {
    return b.vertices.map((v) => `${v.x},${v.y}`).join(" ");
  }
}
