import '../styles/globals.css'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import { ChakraProvider } from '@chakra-ui/react'

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  return library;
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </ChakraProvider>  
  )  
}

export default MyApp


