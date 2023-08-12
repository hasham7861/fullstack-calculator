// NOTES: Made an in math expression evaluator which relies on Reverse Polish Notation Algorithm
// In real life I would use an external package if it was not part of the core functionality like Mathjs, because maintaining this guy is gonna be annoying

type OperatorType = '+' | '-' | '*' | '/' | '%' | '^' | '√'

function infixToRPN(expression: string): string {
    const precedence: Record<OperatorType, number> = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '%': 2,
        '√': 3,
        '^': 4,
    };

    function isOperator(token: OperatorType): boolean {
        return token in precedence;
    }

    function higherPrecedence(op1: OperatorType, op2: OperatorType): boolean {
        return precedence[op1] >= precedence[op2];
    }

    function convertToRPN(infixTokens) {
        const outputQueue = [];
        const operatorStack = [];

        for (const token of infixTokens) {
            if (!isNaN(parseFloat(token))) {
                outputQueue.push(token);
            } else if (token === '(') {
                operatorStack.push(token);
            } else if (token === ')') {
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.pop(); // Pop '('
            } else if (isOperator(token)) {
                while (
                    operatorStack.length > 0 &&
                    operatorStack[operatorStack.length - 1] !== '(' &&
                    higherPrecedence(operatorStack[operatorStack.length - 1], token)
                ) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            }
        }

        while (operatorStack.length > 0) {
            outputQueue.push(operatorStack.pop());
        }

        return outputQueue;
    }

    const tokens = expression.match(/(\d+(\.\d+)?)|[\^√%+\-*/()]/g);
    const rpnTokens = convertToRPN(tokens);
    return rpnTokens.join(' ');
}


const evaluateRPN = (expression: string) => {
  const stack: (string | number)[] = [];

  const tokens = expression.split(' ');
//   console.log('tokens', tokens)

  for (const token of tokens) {
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      console.log('a & b currently: ', a, b)
      switch (token) {
        case '+':
        //   console.log(`${a} + ${b} = ${a+b}`)
          stack.push(a + b);
          break;
        case '-':
        //   console.log(`${a} - ${b} = ${a-b}`)
          stack.push(a - b);
          break;
        case '*':
        //   console.log(`${a} * ${b} = ${a*b}`)
          stack.push(a * b);
          break;
        case '/':
        //   console.log(`${a} / ${b} = ${a/b}`)
          stack.push(a / b);
          break;
        case '%':
        //   console.log(`${a} * ${b} / 100 = ${a * (b / 100)} `)
          stack.push(a * (b / 100));
          stack.push(b)
          break;
        case '^':
        //    console.log(`${a} ^ ${b} = ${Math.pow(a,b)}`)
          stack.push(Math.pow(a, b));
          break;
        case '√':
        //   console.log(`√ ${b} = ${Math.sqrt(b)}`)
          stack.push(Math.sqrt(b));
          break;
        default:
          throw new Error('Invalid token: ' + token);
      }
    }
  }

  return stack[0];
};

const solveMathExpression = (expression: string): number => {
  const rpn = infixToRPN(expression);
  return evaluateRPN(rpn);
};

// Test case
// const expression = '√(3+5)^2 + 10%'; // 8.282
const expression = '(24.75 + 8.92) / (37.5 - 15.25)' // 1.51
const result = solveMathExpression(expression);
console.log(result); 