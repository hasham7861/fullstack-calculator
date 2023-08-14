import mathCalculate from "./math-expression-calculator";

describe("mathCalculate: math expressions evaluator", () => {
  describe("Basic Arithmetic Operations", () => {
    // Weird Edge Cases because how I checked the left and right tokens
    test("4+-5 should be -1", () => {
      expect(mathCalculate("4+-5")).toBe(-1);
    });
    test("0*3 should be 0", () => {
      expect(mathCalculate("0*3")).toBe(0);
    });
  });

  describe("Division", () => {
    test("6 + 2 / 2 should be 7", () => {
      expect(mathCalculate("6 + 2 / 2")).toBe(7);
    });
    test("5 / 2 * 3 should be 7.5", () => {
      expect(mathCalculate("5 / 2 * 3")).toBe(7.5);
    });
    test("(5 + 2) / 3 should be 2.333...", () => {
      expect(mathCalculate("(5 + 2) / 3")).toBeCloseTo(2.333, 3);
    });
  });

  describe("Multiplication", () => {
    test("5 + 4 * 3 should be 17", () => {
      expect(mathCalculate("5 + 4 * 3")).toBe(17);
    });
    test("10 - 4 * 2 should be 2", () => {
      expect(mathCalculate("10 - 4 * 2")).toBe(2);
    });
    test("(3 + 2) * 4 should be 20", () => {
      expect(mathCalculate("(3 + 2) * 4")).toBe(20);
    });
  });

  describe("Addition", () => {
    test("4 + (5 + (3 + 2)) should be 14", () => {
      expect(mathCalculate("4 + (5 + (3 + 2))")).toBe(14);
    });
    test("3 + 4 * 2 - 5 / 2 should be 9.5", () => {
      expect(mathCalculate("3 + 4 * 2 - 5 / 2")).toBe(8.5);
    });
    test("(5 + 3) / 2 + 4 should be 9", () => {
      expect(mathCalculate("(5 + 3) / 2 + 4")).toBe(8);
    });
  });

  describe("Subtraction", () => {
    test("10 - 3 * 2 should be 4", () => {
      expect(mathCalculate("10 - 3 * 2")).toBe(4);
    });
    test("10 - (5 - 3) should be 8", () => {
      expect(mathCalculate("10 - (5 - 3)")).toBe(8);
    });
    test("10 - 4 / 2 should be 8", () => {
      expect(mathCalculate("10 - 4 / 2")).toBe(8);
    });
  });

  describe("Square Roots", () => {
    test("2 + √(25) + 2^3 - 10%3 should be 14", () => {
      expect(mathCalculate("2 + √(25) + 2^3 - 10%3")).toBe(14);
    });
    test("√(9) + 2^2 + 5%2 should be 8", () => {
      expect(mathCalculate("√(9) + 2^2 + 5%2")).toBe(8);
    });
    // Weird Edge Cases because of how I implemented the square root
    test("5√144 should be 60", () => {
      expect(mathCalculate("5√144")).toBe(60);
    });
    test("2^3 * 4 + √100 ^ 2 - 10%3 should be 131", () => {
      expect(mathCalculate("2^3 * 4 + √100 ^ 2 - 10%3")).toBe(131);
    });
    test("2^3 * 4 + √(100+44) ^ 2 - 10%3 should be 175", () => {
      expect(mathCalculate("2^3 * 4 + √(100+44) ^ 2 - 10%3")).toBe(175);
    });
    test("2^3 * 4 + √(100+44+2+1) ^ 2 - 10%3 should be 178", () => {
      expect(mathCalculate("2^3 * 4 + √(100+44+2+1) ^ 2 - 10%3")).toBe(178);
    });
  });

  describe("Exponentiation", () => {
    test("√(16) - 3^2 + 15%4 should be -2", () => {
      expect(mathCalculate("√(16) - 3^2 + 15%4")).toBe(-2);
    });
    test("√(4) ^ 3 - 10 % 3 should be 7", () => {
      expect(mathCalculate("√(4) ^ 3 - 10 % 3")).toBe(7);
    });
    test("√(25) + 2^(1 + 1) - 10%3 should be 8", () => {
      expect(mathCalculate("√(25) + 2^(1 + 1) - 10%3")).toBe(8);
    });
  });

  describe("Modulo", () => {
    test("2^3 * 4 - √(81) % 7 should be 30", () => {
      expect(mathCalculate("2^3 * 4 - √(81) % 7")).toBe(30);
    });
  });
});
