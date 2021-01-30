import contractMap from "@metamask/contract-metadata";
import { BigNumber, ethers } from "ethers";
import { ERC20_ABI } from "./consts";

export const useMetaMaskBalances = async (tokenContract) => {
   var retVal = {};
   try {
      // Array of the tokens' contract addresses
      let tknAddresses = Object.keys(contractMap);
      console.log(tknAddresses);

      // Connect to the blockchain
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let signerAdd = await signer.getAddress();

      // Query the tokens
      const tokenContract = new ethers.Contract(
         "0xb1F8e55c7f64D203C1400B9D8555d050F94aDF39",
         ERC20_ABI,
         signer
      );
      let rawBalances = await tokenContract.balances([signerAdd], tknAddresses);

      // Return only non zero balances
      for (let i = 0; i < rawBalances.length; i += 1) {
         let amt = rawBalances[i];
         let addy = tknAddresses[i];
         if (amt.gt(0)) {
            // Divide by the decimals
            let divisor = BigNumber.from(10);
            divisor = divisor.pow(contractMap[addy].decimals);
            amt = amt.div(divisor);
            retVal[addy] = amt.toNumber();
            console.log(tknAddresses[i]);
         }
      }

      let eth = await signer.getBalance();
      // let divisor = BigNumber.from(10);
      // divisor = divisor.pow(18);
      // eth = eth.div(divisor);
      let div = Math.pow(10, 18);
      retVal.eth = parseFloat(eth.toString()) / div;
   } catch (e) {
      console.log("Issue with trying to get token balances");
      console.error(e);
   }
   console.log(retVal);
   return retVal;
};
