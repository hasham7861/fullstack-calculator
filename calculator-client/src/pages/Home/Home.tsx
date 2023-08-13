import { useState } from "react";
import { Calculator, CalculatorExpressionsHistory } from "../../components";
import { CalculationsHistoryStore } from "../../lib/browser-local-storage";
import "./Home.css";

const calculationStore = new CalculationsHistoryStore()

function Home() {
  const [calculationsHistory, setCalculationsHistory] = useState<string[]>(calculationStore.getStoredExpressions())
  return (
    <div className="home-page">
      <Calculator calculationStore={calculationStore} setCalculationsHistory={setCalculationsHistory} />
      <CalculatorExpressionsHistory calculationsHistory={calculationsHistory}/>
    </div>
  );
}

export default Home;
