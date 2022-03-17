
import styles from '../styles/Home.module.css'
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { TorusConnector } from "@web3-react/torus-connector";
import {  useWeb3React } from '@web3-react/core'
import {
  Modal,
  Center,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  Box,
  Grid,
  GridItem
} from '@chakra-ui/react'

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42,56],
 });
 
 const CoinbaseWallet = new WalletLinkConnector({
  url: 'https://mainnet.infura.io/v3/b373051775cd4c65a9fb9eeb34e16795',
  qrcode: true,
  supportedChainIds: [1, 3, 4, 5, 42],
 });
  const walletconnect = new WalletConnectConnector({
  rpc: { 1: 'https://mainnet.infura.io/v3/b373051775cd4c65a9fb9eeb34e16795' },
  qrcode: true,
});
 const fortmatic = new FortmaticConnector({
  apiKey: "pk_live_F95FEECB1BE324B5",
  chainId: 1
});
 const portis = new PortisConnector({
  dAppId: "211b48db-e8cc-4b68-82ad-bf781727ea9e",
  networks: [1, 100]
});


const torus = new TorusConnector({ chainId: 1 });

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const { active, activate, deactivate ,library, chainId, account, } = useWeb3React();

  const wallet = async(walletType)=>{
    await activate(walletType);
      onClose()
  }

  return (
    <div className={styles.container}>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Flex flexDirection="column">
          {account?
          <Button colorScheme='teal' variant='solid' fontWeight="bolder" pr="0px" color="#fff">
            {account}
            <Button background="#9e0303" variant="solid" onClick={deactivate} ml="15px">Disconnect</Button>
            </Button>
          :null}
          <Button onClick={onOpen} width="max-content" m="0 auto" mt="20px">Connect to a wallet</Button>
        </Flex>
      </Flex>
      

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader mb="10px"><ModalCloseButton /></ModalHeader>
          
          <ModalBody>
              <Grid templateColumns='repeat(2, 1fr)' gap={6} pb="15px">
                <GridItem w='100%' h='10' bg='orange' onClick={()=>wallet(Injected) }  color="white" fontWeight="bold"display="flex" alignItems="center" justifyContent="center" cursor="pointer" borderRadius="5px">metamask</GridItem>
                <GridItem w='100%' h='10' bg='blue.500' onClick={()=>wallet(CoinbaseWallet)}  color="white" fontWeight="bold"display="flex" alignItems="center" justifyContent="center" cursor="pointer" borderRadius="5px">coinbase</GridItem>
                <GridItem w='100%' h='10' bg='teal.500' onClick={()=>wallet(walletconnect)}  color="white" fontWeight="bold"display="flex" alignItems="center" justifyContent="center" cursor="pointer" borderRadius="5px">wallet connect</GridItem>
                <GridItem w='100%' h='10' bg='cyan.500' onClick={()=>wallet(fortmatic)}  color="white" fontWeight="bold"display="flex" alignItems="center" justifyContent="center" cursor="pointer" borderRadius="5px">Formatic</GridItem>
                <GridItem w='100%' h='10' bg='black' onClick={()=>wallet(portis)}  color="white" fontWeight="bold"display="flex" alignItems="center" justifyContent="center" cursor="pointer" borderRadius="5px">Portis</GridItem>
                <GridItem w='100%' h='10' bg='purple.500' onClick={()=>wallet(torus)}  color="white" fontWeight="bold"display="flex" alignItems="center" justifyContent="center" cursor="pointer" borderRadius="5px">Torus</GridItem>
              </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
