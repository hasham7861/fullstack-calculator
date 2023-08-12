import { useState } from "react";

import './Calculator.css'
import mathCalculate from "../../lib/math-expression-validator";

const buttonsSchema = [
  ['1', '2', '3', '+'],
  ['4', '5', '6', '-'],
  ['7', '8', '9', '*'],
  ['.', '0', '/', '√'],
  ['^', '%', '(', ')'],
]

const memoryButtons = ['M+', 'M-', 'MR', 'MC']

const evaluateMathExpression = (expression: string): number => {
  return mathCalculate(expression)

}

export const Calculator = () => {
  const [input, setInput] = useState('');
  const [memoryFunctionState, setMemoryFunctionState] = useState(0);

  const handleButtonClick = (value: string) => {
    setInput((prevInput) => {
      return prevInput + value
    });
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = evaluateMathExpression(input);
      setInput(calculatedResult.toString())
    } catch (error) {
      console.log(error)
      setInput('Error')
    }
  };

  const handleClearInput = () => {
    //TODO: in future save the result in webstorage and user history
    setInput('')
  }

  const handleRedo = () => {
    setInput((prevInput) => prevInput.slice(0, -1))
  }


  const handleMemoryFunctionState = (value: string) => {
    switch (value) {
      case 'M+':
        setMemoryFunctionState(previousState => previousState + parseFloat(input) || 0)
        break;
      case 'M-':
        setMemoryFunctionState(previousState => previousState - parseFloat(input) || 0)
        break;
      case 'MR':
        setInput((prevInput) => prevInput + memoryFunctionState.toString())
        break;
      case 'MC':
        setMemoryFunctionState(0)
        break;
      default:
        throw new Error('Invalid memory function')
        break;
    }
  }
  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />
      <div className="input-buttons">
        <button onClick={handleClearInput}>AC</button>
        <button onClick={handleRedo}>Del</button>
        <button onClick={handleCalculate}>=</button>
      </div>
      <div className="buttons">
        {
          buttonsSchema.map((row, i) => {
            return (
              <div key={i} className="calculator-buttons-row">
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
      <div className="memory-buttons">
        {
          memoryButtons.map(button =>
          (
            <button key={button} onClick={() => handleMemoryFunctionState(button)}>
              {button}
            </button>
          )
          )
        }
      </div>
    </div>
  );
}


export default Calculator;