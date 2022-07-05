import { createContext, useReducer } from "react";
import { AppReducer } from './AppReducer'

import Web3Modal from 'web3modal';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from 'ethers';
import CONFIG from './../config/config.json'

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            rpc: {
                4: process.env.REACT_APP_ALCHEMY_URI
            }
        }
    }
};

const initialState = {
    account: null,
    network: null,
    web3: {
        contract: null,
        provider: null
    }
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)


    const addAccount = (account) => {
        dispatch({
            type: 'ADD_ACCOUNT',
            payload: account
        })
    }
    const delAccount = () => {
        dispatch({
            type: 'DELETE_ACCOUNT'
        })
    }

    const addNetwork = (network) => {
        dispatch({
            type: 'ADD_NETWORK',
            payload: network
        })
    }

    const delNetwork = () => {
        dispatch({
            type: 'DELETE_NETWORK'
        })
    }

    const addContract = (contract) => {
        dispatch({
            type: 'ADD_CONTRACT',
            payload: contract
        })
    }

    const delContract = () => {
        dispatch({
            type: 'DELETE_CONTRACT'
        })
    }

    const addProvider = (provider) => {
        dispatch({
            type: 'ADD_PROVIDER',
            payload: provider
        })
    }

    const delProvider = () => {
        dispatch({
            type: 'DELETE_PROVIDER'
        })
    }    

    const ConnectWallet = async (setError, setErrMsg) => {
        try {
            const web3modal = new Web3Modal({
                providerOptions
            });
            const instance = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(instance);
            addProvider(provider)
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            addAccount(address);
            const network = await provider.getNetwork();
            console.log(network)
            if (network.chainId !== CONFIG.NETWORK_ID) {
                setError(true)
                setErrMsg(`Contract is not deployed on current network. please choose ${CONFIG.NETWORK}`)
                
            } else {
                setError(false)
                setErrMsg('')
                addNetwork(network)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <GlobalContext.Provider value={
            {
                account: state.account,
                network: state.network,
                web3: state.web3,
                delAccount,
                addAccount,
                addNetwork,
                delNetwork,
                addContract,
                delContract,
                addProvider,
                delProvider,
                ConnectWallet

            }
        }
        >
            {children}
        </GlobalContext.Provider>
    )
}