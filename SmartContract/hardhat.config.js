require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');
require('dotenv').config({path: __dirname+'/.env'})
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
require('hardhat-gas-reporter');
require("dotenv").config({ path: ".env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    compilers: [{
      version: "0.8.20",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1000,
        },
      },
    },
    {
      version: "0.8.22",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1000,
        },
      },
    }
  ]
  },

  networks: {
    hardhat: {
      chainId: 31337,
      gasPrice: "auto",
      gasLimit: 3000000,
      // forking: {
      //    url:'https://eth-mainnet.g.alchemy.com/v2/',
      //   }
    }, 
    sepolia: {
      url: "https://1rpc.io/sepolia",
      accounts: [PRIVATE_KEY],
      gasPrice: "auto",
    },
  },
};
