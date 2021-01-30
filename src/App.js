import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import useEthPrice from "./utils/ethprice.js";
import contractMap from "@metamask/contract-metadata";
import { useMetaMaskBalances } from "./utils/getbalances.js";
import { theme } from "./theme";
import TokenCard from "./components/tokencard.js";
import getTknVals from "./utils/tknvals.js";

const ethDets = { decimals: 18, name: "Ethereum", symbol: "ETH" };

function App() {
   let [balances, setBalances] = useState({});

   if (typeof window.ethereum == "undefined") {
      console.log(
         "%cPlease install Metamask! https://metamask.io/download.html",
         "font-size: 36px; font-weight: bold"
      );
   }

   let [ethUsdPrice, ethUsdError, ethUsdLoading] = useEthPrice();

   let tokensHeld = [];

   const GetBalances = async () => {
      useMetaMaskBalances().then(async (r) => {
         var toSet = {};
         tokensHeld = Object.keys(r);
         let vals = await getTknVals(tokensHeld);
         console.log(tokensHeld);
         console.log(Object.keys(vals));
         tokensHeld.map((tkn, key) => {
            let lower = tkn.toLowerCase();
            console.log(vals[tkn]);
            if (tkn === "eth") {
               toSet[lower] = {
                  ...ethDets,
                  balance: r[tkn],
                  val: { usd: ethUsdPrice },
               };
            } else {
               toSet[lower] = {
                  ...contractMap[tkn],
                  balance: r[tkn],
               };
            }
         });
         Object.keys(vals).map((tkn) => {
            toSet[tkn] = {
               ...toSet[tkn],
               val: vals[tkn],
            };
         });
         setBalances(toSet);
         console.log(toSet);
      });
   };

   // GetBalances();

   useEffect(async () => {
      await GetBalances();
   }, []);

   console.log(balances);

   return (
      <div className="App">
         <ThemeProvider theme={theme}>
            {Object.keys(balances).map((tkn) => {
               return <TokenCard token={balances[tkn]} />;
            })}
         </ThemeProvider>
      </div>
   );
}

export default App;
