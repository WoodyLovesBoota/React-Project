import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />}>
          <Route path="price" element={<Price />}></Route>
          <Route path="chart" element={<Chart />}></Route>
        </Route>
        <Route path="/" element={<Coins />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
