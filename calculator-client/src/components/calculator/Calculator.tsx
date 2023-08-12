import { useState } from "react";

import './Calculator.css'
import mathCalculate from "../../lib/math-expression-validator";

const buttonsSchema = [
  ['1', '2', '3', '+'],
  ['4', '5', '6', '-'],
  ['7', '8', '9', '*'],
  ['.', '0', '/', '√'],
  ['^', '%', '(', ')']
]

const evaluateMathExpression = (expression: string): number => {
  return mathCalculate(expression)
  
}

export const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value: string) => {
    setInput((prevInput) => {
      // debug
      // console.log({
      //   prevInput,
      //   value
      // })
      return prevInput + value
    
    });
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = evaluateMathExpression(input);
      setResult(calculatedResult.toString());
    } catch (error) {
      console.log(error)
      setResult('Error',);
    }
  };
  
  const handleClearInput = () => {
    //TODO: in future save the result in webstorage and user history
    setInput('')
    setResult('')
  }

  const handleRedo = () => {
    setInput((prevInput) => prevInput.slice(0,-1))
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
      <button onClick={handleRedo}>Redo</button>
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
}


export default Calculator;