/* NOTE: This is a homemade math expression calculator. 
In real world I would use a prominent math library to parse the expressions or contribute to existing one overtime.
However my assumption from the assignment is that we can't use any packages for core functionality, 
hence the homemade parser. Also I tried my best to cover edge cases that I could come across
I evaluated this parser based on the possible test cases I came up with on the bottom  
*/

type OperatorType = "+" | "-" | "*" | "/" | "%" | "^" | "√";
type OperatorPrecedence = 1 | 2 | 3 | 4;

const operators: Record<OperatorType, OperatorPrecedence> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "^": 3,
  "%": 2,
  "√": 4,
};

const isNumber = (input: string): boolean => {
  // check if token string is a valid number including + and - sign
  const numberPattern = /^-?\d+(\.\d+)?$/;
  return numberPattern.test(input);
};

const DIGITS_AND_OPERATORS_REGEX = /(\d+(\.\d+)?|-\d+(\.\d+)?|\+|-|\*|\/|\^|%|√|\(|\))/g;

// Inspired by Reverse Polish Notation (RPN), but handles brackets as well
function infixToPostfix(tokens: RegExpMatchArray | null): string [] {
  if(!tokens){
    throw new Error("infixToPostfix: No tokens supplied")
  }
  const outputQueue: string[] = [];
  const operatorStack: string[] = [];

  for (const token of tokens) {
    if (isNumber(String(token))) {
      outputQueue.push(token);
    } else if (token in operators) {
      // take care of all the operators with higher precedence first and then process current token after
      while (
        operatorStack.length &&
        operators[operatorStack[operatorStack.length - 1] as OperatorType] >= operators[token as OperatorType]
      ) {
        const top = operatorStack.pop()
        top !== undefined  && outputQueue.push(top)
      }
      operatorStack.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      // put everything in brackets right away to RPN notation
      while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
        const top = operatorStack.pop()
        top !== undefined  && outputQueue.push(top)
      }
      operatorStack.pop(); // Remove the opening parenthesis
    }
  }

  while (operatorStack.length) {
    const top = operatorStack.pop()
    top !== undefined && outputQueue.push(top);
  }

  return outputQueue;
}

/**
 * @description Generic RPN evaluator
 */
function evaluatePostfix(postfixTokens: string[]): number {
  const stack: number[] = [];

  for (const token of postfixTokens) {
    if (isNumber(String(token))) {
      stack.push(parseFloat(token));
    } else if (token in operators) {
      const right = stack.pop();
      const left = stack.pop();
      switch (token) {
        case "√":
          left !== undefined && stack.push(left); // push back extra pop
          right !== undefined && stack.push(Math.sqrt(right));
          break;
        case "%":
          left !== undefined && right !== undefined && stack.push(left % right);
          break;
        case "+":
          left !== undefined && right !== undefined && stack.push(left + right);
          break;
        case "-":
          left !== undefined && right !== undefined && stack.push(left - right);
          break;
        case "*":
          left !== undefined && right !== undefined && stack.push(left * right);
          break;
        case "/":
          left !== undefined && right !== undefined && stack.push(left / right);
          break;
        case "^":
          left !== undefined && right !== undefined && stack.push(Math.pow(left, right));
          break;
      }
    }
  }

  const answer = stack.pop();

  if (answer === undefined) {
    throw new Error("evaluatePostfix: unable to evaluate the RPN expression");
  }

  return answer;
}

function rebuildExpressionToHandleSqrtOperation(
  tokens: RegExpMatchArray | null
): RegExpMatchArray {
  if (!tokens) {
    throw new Error(
      "rebuildExpressionWithBracketsInFrontOfSqrt: No tokens supplied"
    );
  }

  const newTokens: string[] = [];
  let bracketDepth = 0;

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "(") {
      bracketDepth++;
    } else if (tokens[i] === ")") {
      bracketDepth--;
    }

    if (tokens[i] === "√") {
      // edge case when there is number preceding sqrt and no operator
      if (i > 0 && isNumber(tokens[i - 1])) {
        newTokens.push("*");
      }
      newTokens.push(tokens[i]);
      // edge case to add brackets if there isn't brackets for single sqrt
      if (isNumber(tokens[i + 1]) && bracketDepth === 0) {
        newTokens.push("(", ...tokens.slice(i + 1, i + 2), ")");
        i++;
      }
    } else {
      newTokens.push(tokens[i]);
    }
  }

  return newTokens as RegExpMatchArray;
}

export default function mathCalculate(input: string): number {
  const tokens = input.match(DIGITS_AND_OPERATORS_REGEX);

  if (!tokens) {
    throw new Error("mathCalculate: No tokens found");
  }

  const updatedTokens = rebuildExpressionToHandleSqrtOperation(tokens);
  const postfixTokens = infixToPostfix(updatedTokens);
  const result = evaluatePostfix(postfixTokens);

  return result;
}

// There is a limit on sqrt as there is no nesting in there
// const testCases = [
//     ['2 + √(25) + 2^3 - 10%3', 14],
//     ['√(9) + 2^2 + 5%2', 8],
//     ['√(16) - 3^2 + 15%4', -2],
//     ['2^3 * 4 - √(81) % 7', 30],
//     ['10 + √(144) - 3^2 * 2%5', 19],
//     ['√(25) + 2^(1 + 1) - 10%3',8],
//     ['√(4) ^ 3 - 10 % 3', 7],
//     ['2^3 * 4 + √100 ^ 2 - 10%3', 131], // handles case where there is no brackets under sqrt
//     ['2^3 * 4 + √(100+44) ^ 2 - 10%3', 175],
//     ['2^3 * 4 + √(100+44+2+1) ^ 2 - 10%3', 178], // Multiple things in sqrt brackets support
//     ['5√144', 60], // edge case when there is nothing before the sqrt root and it should add * before it
//     ['4+-5' , -1], // edge case to handle +- right next to each other
//     ['0*3', 0] // edge case to handle 0*3
//   ];

// function test() {
//     for (const [expression, expectedResult] of testCases) {
//         const result = mathCalculate(expression as string);
//         console.log(`${expression}, output = ${result} and expectedResult = ${expectedResult}`);
//     }
// }

// test()
