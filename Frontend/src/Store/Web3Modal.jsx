import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

// 1. Get projectId
const projectId = process.env.REACT_APP_WALLET_CONNECT

// // 2. Set chains
// const mainnet = {
//   chainId: 1,
//   name: 'Ethereum',
//   currency: 'ETH',
//   explorerUrl: 'https://etherscan.io',
//   rpcUrl: `${process.env.REACT_ETH_RPC}`
// }

// const LocalHost = {
//   chainId: 1337,
//   name: 'Localhost',
//   currency: 'ETH',
//   explorerUrl: 'https://testnet.bscscan.com',
//   rpcUrl: `${process.env.REACT_APP_RPC}`
// }

const sepolia = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io/',
  rpcUrl: `${process.env.REACT_BRIDGE_SEPOURL}`
}

// 3. Create modal
const metadata = {
  name: 'Creed Coin Website',
  description: 'This is Creed Coin website',
  url: 'https://CreedCoin.org/', // origin must match your domain & subdomain
  icons: ['https://CreedCoin.org/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  // rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})


createWeb3Modal({
  ethersConfig,
  chains: [sepolia],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration,
  enableOnramp: true // Optional - false as default
})

export function Web3Modal({ children }) {
  return children
}