import { useState } from "react";

import './Calculator.css';
import mathCalculate from "../../lib/math-expression-calculator/math-expression-calculator";
import BackendClient from "../../lib/backend-client";
import { useAppContext } from "../../context/AppContext";
import { toast } from "../toast/Toast";

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
  const { isLoggedIn, calculationStore, setCalculationsHistory } = useAppContext();

  const handleButtonClick = (value: string) => {
    setInput((prevInput) => {
      return prevInput + value
    });
  };

  const addExpressionToUserHistoryAndSyncWithLocalStorage = async () => {
    await BackendClient.post('/math/add-expression', { expression: input })
    try { 
      const response = await BackendClient.get('/math/fetch-history')
      const data: string[] = response.data

      calculationStore.setStoredExpressions(data)
      setCalculationsHistory(data)
    } catch(err) {
      toast.error('Error while adding expression to logged in user-history')
    }
  }

  const handleCalculate = async () => {
    try {
      const calculatedResult = evaluateMathExpression(input);
      setInput(calculatedResult.toString())
      calculationStore.setItem(input)
      calculationStore.resetCursorToLastPosition()

      if(isLoggedIn) {
        await addExpressionToUserHistoryAndSyncWithLocalStorage()
      } else{
        setCalculationsHistory((prevHistory) => [...prevHistory, input])
      }
    } catch (error) {
      setInput('Error')
    }
  };

  const handleClearInput = () => {
    setInput('')
  }

  const handleRedo = () => {
    setInput((prevInput) => prevInput.slice(0, -1))
  }

  const handlePrev = () => {
    const prevItem = calculationStore.getPreviousItem()
    prevItem !== undefined && setInput(prevItem)
  }

  const handleNext = () => {
    const nextItem = calculationStore.getNextItem()
    nextItem !== undefined && setInput(nextItem)
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
    }
  }
  return (
    <div className="calculator">
      <input type="text" value={input} readOnly />
      <div className="history-buttons">
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div className="input-buttons">
        <button onClick={handleClearInput}>Ac</button>
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