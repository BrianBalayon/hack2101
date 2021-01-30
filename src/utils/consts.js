//Query to get current value
export const ETH_USD_URL =
   "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

export const ERC20_ABI = [
   {
      constant: true,
      inputs: [
         { name: "user", type: "address" },
         { name: "token", type: "address" },
      ],
      name: "tokenBalance",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
   },
   {
      constant: true,
      inputs: [
         { name: "users", type: "address[]" },
         { name: "tokens", type: "address[]" },
      ],
      name: "balances",
      outputs: [{ name: "", type: "uint256[]" }],
      payable: false,
      stateMutability: "view",
      type: "function",
   },
   { payable: true, stateMutability: "payable", type: "fallback" },
];
