import mathCalculate from './math-expression-calculator'


describe('mathCalculate: math expressions evaluator', () => {

  describe('Basic Arithmetic Operations', () => {
    // Weird Edge Cases
    test('4+-5 should be -1', () => {
      expect(mathCalculate('4+-5')).toBe(-1);
    });
    test('0*3 should be 0', () => {
      expect(mathCalculate('0*3')).toBe(0);
    });
  });

  
  describe('Division', () => {
    test('6 / 2 should be 3', () => {
      expect(mathCalculate('6 / 2')).toBe(3);
    });
    test('5 / 2 should be 2.5', () => {
      expect(mathCalculate('5 / 2')).toBe(2.5);
    });
    test('4 / 0 should throw an error', () => {
      expect(mathCalculate('4 / 0')).toBe(Infinity);
    });
    test('0 / 7 should be 0', () => {
      expect(mathCalculate('0 / 7')).toBe(0);
    });
  });

  describe('Multiplication', () => {
    test('5 * 4 should be 20', () => {
      expect(mathCalculate('5 * 4')).toBe(20);
    });
    test('0 * 9 should be 0', () => {
      expect(mathCalculate('0 * 9')).toBe(0);
    });
    test('-5 * 3 should be -15', () => {
      expect(mathCalculate('-5 * 3')).toBe(-15);
    });
    test('-5 * -4 should be 20', () => {
      expect(mathCalculate('-5 * -4')).toBe(20);
    });
  });

  describe('Addition', () => {
    test('4 + 5 should be 9', () => {
      expect(mathCalculate('4 + 5')).toBe(9);
    });
    test('7 + -3 should be 4', () => {
      expect(mathCalculate('7 + -3')).toBe(4);
    });
    test('-4 + -6 should be -10', () => {
      expect(mathCalculate('-4 + -6')).toBe(-10);
    });
    test('0 + 8 should be 8', () => {
      expect(mathCalculate('0 + 8')).toBe(8);
    });
  });

  describe('Subtraction', () => {
    test('8 - 3 should be 5', () => {
      expect(mathCalculate('8 - 3')).toBe(5);
    });
    test('5 - 9 should be -4', () => {
      expect(mathCalculate('5 - 9')).toBe(-4);
    });
    test('4 - -2 should be 6', () => {
      expect(mathCalculate('4 - -2')).toBe(6);
    });
    test('0 - 7 should be -7', () => {
      expect(mathCalculate('0 - 7')).toBe(-7);
    });
  });

  
  describe('Square Roots', () => {
    test('2 + √(25) + 2^3 - 10%3 should be 14', () => {
      expect(mathCalculate('2 + √(25) + 2^3 - 10%3')).toBe(14);
    });
    test('√(9) + 2^2 + 5%2 should be 8', () => {
      expect(mathCalculate('√(9) + 2^2 + 5%2')).toBe(8);
    });
    // Weird Edge Cases
    test('5√144 should be 60', () => {
      expect(mathCalculate('5√144')).toBe(60);
    });
    test('2^3 * 4 + √100 ^ 2 - 10%3 should be 131', () => {
      expect(mathCalculate('2^3 * 4 + √100 ^ 2 - 10%3')).toBe(131);
    });
    test('2^3 * 4 + √(100+44) ^ 2 - 10%3 should be 175', () => {
      expect(mathCalculate('2^3 * 4 + √(100+44) ^ 2 - 10%3')).toBe(175);
    });
    test('2^3 * 4 + √(100+44+2+1) ^ 2 - 10%3 should be 178', () => {
      expect(mathCalculate('2^3 * 4 + √(100+44+2+1) ^ 2 - 10%3')).toBe(178);
    });
  });

  describe('Exponentiation', () => {
    test('√(16) - 3^2 + 15%4 should be -2', () => {
      expect(mathCalculate('√(16) - 3^2 + 15%4')).toBe(-2);
    });
    test('√(4) ^ 3 - 10 % 3 should be 7', () => {
      expect(mathCalculate('√(4) ^ 3 - 10 % 3')).toBe(7);
    });
    test('√(25) + 2^(1 + 1) - 10%3 should be 8', () => {
      expect(mathCalculate('√(25) + 2^(1 + 1) - 10%3')).toBe(8);
    });
  });

  describe('Modulo', () => {
    test('2^3 * 4 - √(81) % 7 should be 30', () => {
      expect(mathCalculate('2^3 * 4 - √(81) % 7')).toBe(30);
    });
  });

});
