import { Calculator, CalculatorExpressionsHistory } from "../../components";
import "./Home.css";

function Home() {

  return (
    <div className="home-page">
      <Calculator />
      <CalculatorExpressionsHistory/>
    </div>
  );
}

export default Home;
