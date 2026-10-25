import { BrowserProvider, JsonRpcProvider } from 'ethers'

let getProvider = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with the wallet's injection timing.
  function choose() {
    // Checking if the browser wallet (MetaMask) injected an EIP-1193 provider; it no longer injects window.web3.
    if (typeof window.ethereum !== 'undefined') {
      console.log('Injected Ethereum provider detected.');

      resolve(new BrowserProvider(window.ethereum))
    } else {
      // Fallback to localhost if no provider injection.
      console.log('No Ethereum provider injected, using local node.');

      resolve(new JsonRpcProvider('http://localhost:8545'))
    }
  }

  if (document.readyState === 'complete') {
    choose()
  } else {
    window.addEventListener('load', choose)
  }
})

export default getProvider
