import { TestBed } from "@angular/core/testing";

import { MatterService } from "./matter.service";

describe("MatterService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: MatterService = TestBed.get(MatterService);
    expect(service).toBeTruthy();
  });
});
