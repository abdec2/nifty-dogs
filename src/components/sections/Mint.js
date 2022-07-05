import CONFIG from './../../config/config.json'
import contractAbi from './../../config/abi.json'
import styled from "styled-components";
import { useContext, useState } from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ethers } from 'ethers';
import { GlobalContext } from '../../context/GlobalContext';

const MySwal = withReactContent(Swal)


const Button = styled.button`
  display: inline-block;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  outline: none;
  border: none;
  font-weight: 600;
  font-size: ${(props) => props.theme.fontlg};
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  @media (max-width: 48em) {
    padding: 1rem 2rem;
  }

  @media (max-width: 30em) {
    padding: 0.5rem 2rem;
    font-size: ${(props) => props.theme.fontsm};
  }

  &:hover {
    transform: scale(0.9);
  }

  &::after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    border: 2px solid ${(props) => props.theme.body};
    width: 100%;
    height: 100%;
    border-radius: 50px;
    transition: all 0.2s ease;
  }

  &:hover::after {
    transform: translate(-50%, -50%) scale(1);
    padding: 0.3rem;
  }
`;

const ButtonLink = styled.a`
  display: inline-block;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  outline: none;
  border: none;
  font-weight: 600;
  font-size: ${(props) => props.theme.fontlg};
  padding: 0.5rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  @media (max-width: 48em) {
    padding: 1rem 2rem;
  }

  @media (max-width: 30em) {
    padding: 0.5rem 2rem;
    font-size: ${(props) => props.theme.fontsm};
  }

  &:hover {
    transform: scale(0.9);
  }

  &::after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    border: 2px solid ${(props) => props.theme.body};
    width: 100%;
    height: 100%;
    border-radius: 50px;
    transition: all 0.2s ease;
  }

  &:hover::after {
    transform: translate(-50%, -50%) scale(1);
    padding: 0.3rem;
  }
`;

const Mint = () => {
  const [mintAmount, setMintAmount] = useState(1)
  const [loading, setLoading] = useState(false);
  const { account, web3 } = useContext(GlobalContext)

  const increment = (e) => {
    if (mintAmount < 5) {
      setMintAmount(mintAmount + 1)
    }
  }

  const decrement = (e) => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1)
    }
  }

  const claimNFT = async () => {
    try {
      if (!window.ethereum) {
        MySwal.fire({
          icon: 'error',
          title: 'Please install MetaMask',
          showConfirmButton: false,
          timer: 1500
        })
        return
      }
      if (!account) {

        MySwal.fire({
          icon: 'error',
          title: 'Please connnect wallet',
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }

      setLoading(true)
      const signer = web3.provider.getSigner();
      const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, contractAbi, signer);
      const totalCost = CONFIG.COST * mintAmount;
      const balance = ethers.utils.formatEther(await web3.provider.getBalance(signer.getAddress()));

      if (balance < totalCost) {
        setLoading(false);
        MySwal.fire({
          icon: 'error',
          title: 'Insufficient Balance',
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }

      const value = ethers.utils.parseEther(totalCost.toString());
      const estimate = await contract.estimateGas.mint(account, mintAmount, { value: value })
      const tx = {
        gasLimit: estimate.toString(),
        value: value
      }

      const mintTx = await contract.mint(account, mintAmount, tx)
      await mintTx.wait()

      MySwal.fire({
        icon: 'success',
        title: 'NFT minted successfully',
        showConfirmButton: false,
        timer: 1500
      })

      setLoading(false)
    } catch (e) {
      console.log(e)
      MySwal.fire({
        icon: 'error',
        title: 'Something went wrong',
        showConfirmButton: false,
        timer: 1500
      })
      setLoading(false)
    }
  }

  return (
    <div id="mint" className="w-[100vw] h-[100vh] bg-black flex flex-col items-center justify-center relative overflow-hidden py-20">
      <div className="w-full text-center">
        <h1 className="text-white text-4xl underline">Mint Your NFTs</h1>
      </div>
      <div className="text-white w-full text-center mt-10">
        <a href={CONFIG.BLOCKCHAIN_EXPLORER + '/address/' + CONFIG.CONTRACT_ADDRESS} target="_blank" rel="noreferrer">{CONFIG.CONTRACT_ADDRESS.slice(0, 15) + '....' + CONFIG.CONTRACT_ADDRESS.slice(37, 42)}</a>
      </div>
      <div className='mt-10 text-white flex items-center justify-center space-x-5'>
        <Button onClick={decrement}>-</Button>
        <div>{mintAmount}</div>
        <Button onClick={increment}>+</Button>
      </div>
      <div className='mt-10 text-white flex items-center justify-center space-x-5'>
        {loading ? (<Button disabled>Busy</Button>) : (<Button onClick={claimNFT}>Buy</Button>)}
        <ButtonLink href={CONFIG.MARKETPLACE_URI + account} target="_blank" rel="noreferrer">Opensea</ButtonLink>
      </div>
    </div>
  )
}

export default Mint