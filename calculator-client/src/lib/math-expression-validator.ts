// TODO: Refactor this RPN code to have proper typing and smaller functions to make it easy to read.

type OperatorType = '+' | '-' | '*' | '/' | '%' | '^' | '√'
type OperatorPrecedence = 1 | 2 | 3 | 4

const operators : Record<OperatorType, OperatorPrecedence> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3,
  '%': 2,
  '√': 4,
};

const isNumber = (input: string): boolean => {
    // This regex assumes we already extract the + or minus sign away from number
    const numberPattern = /^\d+(\.\d+)?$/;
    return numberPattern.test(input);
}

const DIGITS_AND_OPERATORS_REGEX = /(\d+(\.\d+)?|\+|-|\*|\/|\^|%|√|\(|\))/g;

export default function processMathExpression(input: string): number {
    
    // Inspired by Reverse Polish Notation, but handles brackets as well
    function infixToPostfix(tokens: RegExpMatchArray | null): string [] {
      if(!tokens){
        throw new Error("infixToPostfix: No tokens supplied")
      }
      const outputQueue: string[] = [];
      const operatorStack: string[] = [];
  
      for (const token of tokens) {
        if (isNumber(token)) {
          outputQueue.push(token);
        } else if (token in operators) {
          while (
            operatorStack.length &&
            operators[operatorStack[operatorStack.length - 1]] >= operators[token]
          ) {
            outputQueue.push(operatorStack.pop());
          }
          operatorStack.push(token);
        } else if (token === '(') {
          operatorStack.push(token);
        } else if (token === ')') {
          while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
            outputQueue.push(operatorStack.pop());
          }
          operatorStack.pop(); // Remove the opening parenthesis
        }
      }
  
      while (operatorStack.length) {
        const top = operatorStack.pop()
        top && outputQueue.push(top);
      }
  
      return outputQueue;
    }
  
    function evaluatePostfix(postfixTokens: string []): number {
      const stack = [];
  
      for (const token of postfixTokens) {
        if (!isNaN(token)) {
          stack.push(parseFloat(token));
        } else if (token in operators) {
          if (token === '√') {
            const operand = stack.pop();
            stack.push(Math.sqrt(operand));
          } else if (token === '%') {
            const right = stack.pop();
            const left = stack.pop();
            stack.push(left % right);
          } else {
            const right = stack.pop();
            const left = stack.pop();
            switch (token) {
              case '+':
                stack.push(left + right);
                break;
              case '-':
                stack.push(left - right);
                break;
              case '*':
                stack.push(left * right);
                break;
              case '/':
                stack.push(left / right);
                break;
              case '^':
                stack.push(Math.pow(left, right));
                break;
            }
          }
        }
      }
  
      return stack.pop();
    }

    function rebuildExpressionWithBracketsInFrontOfSqrt(tokens: RegExpMatchArray | null): RegExpMatchArray {
        if (!tokens) {
            throw new Error("rebuildExpressionWithBracketsInFrontOfSqrt: No tokens supplied");
        }
    
        const newTokens: string[] = [];
    
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === '√' && isNumber(tokens[i + 1])) {
                newTokens.push(tokens[i], '(', ...tokens.slice(i + 1, i + 3), ')');
                i += 2;
            } else {
                newTokens.push(tokens[i]);
            }
        }
    
        return newTokens as RegExpMatchArray;
    }
  
    const tokens = input.match(DIGITS_AND_OPERATORS_REGEX);
    
    if(!tokens){
        throw new Error("processMathExpression: No tokens found")
    }

    const updatedTokens = rebuildExpressionWithBracketsInFrontOfSqrt(tokens)
  
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
//     ['2^3 * 4 + √(100) ^ 2 - 10%3', 131],
//     ['2^3 * 4 + √(100+44) ^ 2 - 10%3', 175],
//     ['2+3^2/3 + √144', 17]
//   ];
  
// function testCustomEval() {
//     for (const [expression, expectedResult] of testCases) {
//         const result = processMathExpression(expression);
//         console.log(`${expression}, output = ${result} and expectedResult = ${expectedResult}`);
//     }
// }