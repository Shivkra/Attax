import React, { useEffect, useState } from 'react';
import './App.css';
import SelectCharacter from './Components/SelectCharacter';
import Arena from './Components/Arena';
import myEpicGame from './utils/MyEpicGame.json';
import { CONTRACT_ADDRESS, transformCharacterData } from './constants';
import { ethers } from 'ethers';
import LoadingIndicator from './Components/LoadingIndicator';

// Constants
const LINK = "https://proud-truth-2826.on.fleek.co/";

const App = () => {
  // State
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);
 
  const [isLoading, setIsLoading] = useState(false);

  
  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Make sure you have MetaMask!');
        setIsLoading(false);
        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const checkNetwork = async () => {
    try {
      if (window.ethereum.networkVersion !== '80001') {
        alert("Please connect to Polygon Mumbai Testnet!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Render Methods
  const renderContent = () => {

    if (isLoading) {
      return <LoadingIndicator />;
    }

    
    if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
          <img
            src="https://cloudflare-ipfs.com/ipfs/QmUeRcZNGW2fFkaf6heboHBaiWKTeySQMfcfYfRiUC1M4n"
            alt="Earth"
          />
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWalletAction}
          >
            Connect Wallet
          </button>
        </div>
      );
   
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;

    } else if (currentAccount && characterNFT) {
      return <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />;
    }
  };


  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkIfWalletIsConnected();
    checkNetwork();
  }, []);

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      console.log('Checking for Character NFT on address:', currentAccount);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      );

      const txn = await gameContract.checkIfUserHasNFT();
      if (txn.name) {
        console.log('User has character NFT');
        setCharacterNFT(transformCharacterData(txn));
      } else {
        console.log('No character NFT found');
      }

      setIsLoading(false);
    };


    if (currentAccount) {
      console.log('CurrentAccount:', currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️  Attax  ⚔️</p>
          <p className="sub-text">Team up to protect the Metaverse!</p>
          {/* This is where our button and image code used to be!
           *	Remember we moved it into the render method.
           */}
          {renderContent()}
        </div>
        <div className="footer-container">
          
          <a
            className="footer-text"
            href={LINK}
            target="_blank"
            rel="noreferrer"
          >built_by_@SivaSankar🧑‍💻</a>
        </div>
      </div>
    </div>
  );
};

export default App;