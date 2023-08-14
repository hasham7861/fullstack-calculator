import { useEffect } from "react";
import { Calculator, CalculatorExpressionsHistory } from "../../components";
import "./Home.css";
import { useAppContext } from "../../context/AppContext";


function Home() {
  const {calculationsHistory, setCalculationsHistory, calculationStore} = useAppContext()
  
  useEffect(() => {
    setCalculationsHistory(calculationStore.getStoredExpressions())
  }, [setCalculationsHistory])

  return (
    <div className="home-page">
      <div className="calculator-container">
        <Calculator />
        <CalculatorExpressionsHistory calculationsHistory={calculationsHistory}/>
      </div>
    </div>
  );
}

export default Home;
