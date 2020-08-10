import { GoogleSheets } from "./sheets";

describe("Testing sheets", () => {
  it("Should be defined", () => {
    expect(GoogleSheets).toBeDefined();
  });

  it("Should be an object type", () => {
    expect(typeof GoogleSheets).toBe("function");
  });
});
