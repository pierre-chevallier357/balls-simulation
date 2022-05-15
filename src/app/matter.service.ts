import { Injectable } from "@angular/core";
import { Bodies, Body, Composite, Engine, World } from "matter-js";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MatterService {
  private engine: Engine = Engine.create();
  private bodiesSubj = new BehaviorSubject<Body[]>([]);
  readonly bodiesObs = this.bodiesSubj.asObservable();

  constructor() {
    this.engine.world.gravity = {
      x: 0,
      y: -0.0001,
      scale: 9.81,
    };
    this.sizeBox(400, 400);
    setInterval(() => {
      Engine.update(this.engine, 1000 / 60);
      this.bodiesSubj.next(Composite.allBodies(this.engine.world));
    }, 1000 / 60);
  }

  sizeBox(width: number, heigth: number) {
    const L = [
      Bodies.rectangle(200, 0, width, 10, { isStatic: true }),
      Bodies.rectangle(0, 1000, 10, 2000, { isStatic: true }),
      Bodies.rectangle(400, 1000, 10, 2000, { isStatic: true }),
    ];
    L.forEach((b) => {
      b.angularVelocity = b.angularSpeed = 0;
      b.frictionAir = 0;
      b.friction = 0.1;
    });
    World.add(this.engine.world, L);
  }

  addBalle(x: number, y: number, r: number, color: string) {
    const b = Bodies.circle(x, y, r, {}, 128);
    b.frictionAir = 0;
    b.restitution = 1;
    b.angularSpeed = b.angularVelocity = 0;
    World.add(this.engine.world, b);
  }
}
