import { createAppKit } from '@reown/appkit/react'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
import { mainnet } from '@reown/appkit/networks'

const projectId = process.env.REACT_APP_WALLET_CONNECT

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

const metadata = {
  name: 'FYP Project',
  description: 'This is FYP Project website',
  url: 'https://fyp.org/',
  icons: ['https://fyp.org/']
}

// 3. Create the AppKit instance
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [mainnet, sepolia],
  projectId,
  features: {
    analytics: true
  }
})

export function Web3Modal({ children }) {
  return children
}