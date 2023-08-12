import { useState } from "react";
import './Calculator.css'

const buttonsSchema = [
  ['1', '2', '3', '+'],
  ['4', '5', '6', '-'],
  ['7', '8', '9', '*'],
  ['.', '0', '/', '√'],
  ['^', '%', '(', ')']
]


const evaluateMathExpression = (expression: string) => {
  
  // To support 
  const sanitizeExpression = expression
    .replace(/√/g, 'Math.sqrt')
    // .replace(/%/g, '/100')
    .replace(/\^/g, '**');

  return eval(sanitizeExpression);
  
}

export const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = evaluateMathExpression(input);
      setResult(calculatedResult);
    } catch (error) {
      setResult('Error');
    }
  };
  
  const handleClearInput = () => {
    //TODO: in future save the result in webstorage and user history
    setInput('')
    setResult('')
  }

  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />
      <div className="result">
        {result !== '' && <div>Result: {result}</div>}
      </div>
      <div className="buttons">
        {
          buttonsSchema.map((row, i) => {
            return (
              <div key={i + 'fixme-to-have-more-unique-key'} className="calculator-buttons-row">
                {row.map((button) => (
                  <button key={button} onClick={() => handleButtonClick(button)}>
                    {button}
                  </button>
                ))}
              </div>
            )
          })
        }
      </div>
      <button onClick={handleClearInput}>Clear</button>
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
}


export default Calculator;