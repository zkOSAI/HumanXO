import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '7abe0e6ebe8274dc23d59ad3861400de'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [

   // walletConnect({ projectId }),
    metaMask(),
  
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})