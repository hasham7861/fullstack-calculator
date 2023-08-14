import './CalculatorExpressionsHistory.css';


interface IProps {
  calculationsHistory: string []
}

export function CalculatorExpressionsHistory ({calculationsHistory}: IProps) {

  return (
    <div className="calculator-expressions-history-wrapper">
      <h2>History</h2>
      <div className="calculator-expressions-history-container">
        {
         calculationsHistory.map((expression: string, index: number) => {
            return (
              <div className="calculator-expressions-history-item" key={index+expression}>
                <p>{expression}</p>
              </div>
            )
          }
        )}
      </div>
    </div>
  )

}