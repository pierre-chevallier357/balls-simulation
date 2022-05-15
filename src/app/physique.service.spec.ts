import { TestBed } from "@angular/core/testing";

import { PhysiqueService } from "./physique.service";

describe("PhysiqueService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: PhysiqueService = TestBed.get(PhysiqueService);
    expect(service).toBeTruthy();
  });
});
