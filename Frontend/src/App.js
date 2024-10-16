import './App.css';
import { useState } from 'react';
import React from 'react';
import image from '../src/components/Assets/logo-light.ico';

function App() {
  const [walletAddress, setWalledAddress] = useState("");

async function requestAccount(){
  console.log('requesting account.. ');
  if(window.ethereum){
    console.log('metaMask detected')
try {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts", 
  });
  setWalledAddress(accounts[0]);
} catch (error) {
  console.log("Error connecting..."); 
}
  }else{
    console.log('MetaMask Not detected')
  }
}

// this is the provider to interact with smart contract

// async function connectWallet(){
//   if(typeof window.ethereum !== 'undefined'){
//     await requestAccount();

//     const provider = new ethers.providers.web3provider(window.ethereum);
//   }
// }


  return (

    <>
    <div className='wrapper'> 
        <div className="icon">
            <img src={image} alt="Food Tracer" />
        </div>
        <div>
            <h1>Connect To Food Tracer</h1>
            <button onClick={requestAccount} >MetaMask</button>
            <div className='register-link'>
                <p>Don&#x27;t have an MetaMask? 
                    <a href="https://metamask.io/download/"> Register</a>
                </p>
                <h5>wallet Address: {walletAddress}</h5>
            </div>
        </div>
    </div>
</>
    
  );
}

export default App;
