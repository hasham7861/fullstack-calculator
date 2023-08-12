// TODO: Refactor this RPN code to have proper typing and smaller functions to make it easy to read.

// type OperatorType = '+' | '-' | '*' | '/' | '%' | '^' | '√'

export default function processMathExpression(input) {
    const operators = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '^': 3,
      '%': 2,
      '√': 4,
    };
  
    function infixToPostfix(tokens) {
      const outputQueue = [];
      const operatorStack = [];
  
      for (const token of tokens) {
        if (!isNaN(token)) {
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
        outputQueue.push(operatorStack.pop());
      }
  
      return outputQueue;
    }
  
    function evaluatePostfix(postfixTokens) {
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
  
    const tokens = input.match(/(\d+(\.\d+)?|\+|\-|\*|\/|\^|%|\√|\(|\))/g);

     // Refactor this out of the code: automatically add brackets after √ if there's only one number
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '√' && !isNaN(tokens[i + 1])) {
        tokens.splice(i + 1, 0, '(');
        const closingIndex = tokens.indexOf(')', i + 1);
        if (closingIndex === -1) {
            tokens.push(')');
        } else {
            tokens.splice(closingIndex + 1, 0, ')');
        }
        }
    }
  
    const postfixTokens = infixToPostfix(tokens);
    const result = evaluatePostfix(postfixTokens);
  
    return result;
  }

// const inputExpression = "2 + √(25+2) + 2^3 - 10%3"; // 14.896152422706631 
// const result = processMathExpression(inputExpression);

// console.log(result); // Output: 14.896152422706631 

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
//     ['2^3 * 4 + √(100+44) ^ 2 - 10%3', 175]
//   ];
  
// function testCustomEval() {
//     for (const [expression, expectedResult] of testCases) {
//         const result = processMathExpression(expression);
//         console.log(`${expression}, output = ${result} and expectedResult = ${expectedResult}`);
//     }
// }