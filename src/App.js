import React from "react";
import useEthPrice from "./utils/ethprice.js";
import { useMetaMaskBalances } from "./utils/getbalances.js";

function App() {
   if (typeof window.ethereum == "undefined") {
      console.log(
         "%cPlease install Metamask! https://metamask.io/download.html",
         "font-size: 36px; font-weight: bold"
      );
   }

   let [ethUsdPrice, ethUsdError, ethUsdLoading] = useEthPrice();
   let balances = useMetaMaskBalances();
   let tokensHeld = Object.keys(balances);

   return (
      <div className="App">

      </div>
   );
}

export default App;
