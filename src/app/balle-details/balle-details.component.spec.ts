import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BalleDetailsComponent } from "./balle-details.component";

describe("BalleDetailsComponent", () => {
  let component: BalleDetailsComponent;
  let fixture: ComponentFixture<BalleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BalleDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
