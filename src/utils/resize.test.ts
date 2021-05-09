import { calculateScale } from "./resize";

describe("resize", () => {
  const { innerWidth, innerHeight } = window;

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: innerWidth });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: innerHeight });
  });

  it("calculates scale correctly", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 3840 });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 2160 });

    expect(calculateScale()).toBe(2.4);

    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1920 });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 1080 });

    expect(calculateScale()).toBe(1.2);

    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1024 });
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 768 });

    expect(calculateScale()).toBe(0.8533333333333334);
  });
});
