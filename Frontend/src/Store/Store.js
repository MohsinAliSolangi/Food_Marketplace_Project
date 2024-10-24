import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";

import FoodTraceabilityContractAddress from "./contractsData/FoodTraceabilityContract-address.json";
import FoodTraceabilityContract from "./contractsData/FoodTraceabilityContract.json";

import FoodTraceabilityMarketplaceAddress from "./contractsData/FoodTraceabilityMarketplace-address.json";
import FoodTraceabilityMarketplace from "./contractsData/FoodTraceabilityMarketplace.json";

import { ToastContainer, toast } from "react-toastify";
import { useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";
import { BrowserProvider, Contract, formatUnits } from 'ethers'

export const Store = createContext();

export const StoreProvider = ({ children }) => {
  const { address, isConnected } = useAppKitAccount();

  const { walletProvider } = useAppKitProvider("eip155");

  const [loader, setloader] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);

  const [contractData, setContractData] = useState({
    ethBalance: 0,
    usdcBalance: 0,
    usdtBalance: 0,
    creedBalance: 0,
    raisedAmount: 0,
    tokenPrice: 0,
    totalSupply: 300000000000,
    isPreSaleActive: false,
    stakedTokens: 0,
    startTime: 0,
    duration: 0,
    rewardEarned: 0,
    ClaimedReward: 0,
  });

  // ////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////

  const GetIsUserRegistered = async () => {
    try {
      if (isConnected) {
        setloader(true);

        const ethersProvider = new ethers.providers.Web3Provider(
          walletProvider
        );

        const signer = ethersProvider.getSigner();

        const FoodMarketplaceContract = new ethers.Contract(
          FoodTraceabilityMarketplaceAddress.address,
          FoodTraceabilityMarketplace.abi,
          signer
        );

        const IsRegistered = await FoodMarketplaceContract.isUser(address);
        console.log(IsRegistered,"IsRegistered`1");
        setloader(false);
        return IsRegistered;
      }
    } catch (error) {
      setloader(false);
      console.log(error);
    }
  };

const registerNewUser = async (data) => {
try {
  setloader(true);

  console.log(walletProvider,"walletProvider");

  // Ensure walletProvider is defined
  if (!walletProvider) {
    throw new Error("Wallet provider is not defined.");
}

const ethersProvider = new ethers.providers.Web3Provider(
  walletProvider
);

const signer = ethersProvider.getSigner();

  const FoodMarketplaceContract = new ethers.Contract(
    FoodTraceabilityMarketplaceAddress.address,
    FoodTraceabilityMarketplace.abi,
    signer
  );

 const regis = await FoodMarketplaceContract.registerAsUser(data?.name,data?.email,data?.phone_number,data?.role);
 regis.wait();

 setloader(false);
} catch (error) {
  console.log(error);
}
  };

  // const BuyWithUSDTandUSDC = async (payAmountInUSDT, tokens, isUSDT) => {
  //   if (!isConnected) {
  //     return toast.error("Please Connect Your Wallet."), setloader(false);
  //   }
  //   try {
  //     let tokensss = ethers.utils.formatEther(tokens?.toString());
  //     console.log(+tokensss?.toString(), "tokenssstokenssstokensss");
  //     if (+tokensss?.toString() < 10) {
  //       return toast.error("Please buy minimum One (1) Dollar");
  //     } else if (+tokensss?.toString() > 10000) {
  //       return toast.error("Please buy maximum One Thousand (1000) Dollar");
  //     }
  //     console.log(tokens, "tokenstokenstokenstokenstokens");
  //     setloader(true);
  //     const provider = new ethers.providers.Web3Provider(walletProvider);
  //     const signer = provider.getSigner();
  //     const presaleContract = new ethers.Contract(
  //       creedPresaleContractAddress.address,
  //       creedPresaleContract.abi,
  //       signer
  //     );
  //     const USDTContracts = new ethers.Contract(
  //       USDTContractAddress.address,
  //       USDTContract.abi,
  //       signer
  //     );

  //     const USDCContracts = new ethers.Contract(
  //       USDCContractAddress.address,
  //       USDCContract.abi,
  //       signer
  //     );

  //     let amountInWei = ethers.utils.parseEther(payAmountInUSDT?.toString());
  //     if (isUSDT) {
  //       let tokenApprove = await USDTContracts.approve(
  //         creedPresaleContractAddress.address,
  //         amountInWei
  //       );
  //       await tokenApprove.wait();

  //       const buying = await presaleContract.buyWithUSDT(tokens, isUSDT);
  //       buying.wait();
  //     } else {
  //       let tokenApprove = await USDCContracts.approve(
  //         creedPresaleContractAddress.address,
  //         amountInWei
  //       );
  //       await tokenApprove.wait();

  //       const buying = await presaleContract.buyWithUSDT(tokens, isUSDT);
  //       buying.wait();
  //     }

  //     await GetValues();
  //     setloader(false);
  //   } catch (error) {
  //     setloader(false);
  //     toast.error(`${JSON.stringify(error.reason)}`);
  //     console.log(error);
  //   }
  // };

  // const BuyWithETH = async (tokens, amountInEthPayable) => {
  //   if (!isConnected) {
  //     return toast.error("Please Connect Your Wallet."), setloader(false);
  //   }
  //   try {
  //     let tokensss = ethers.utils.formatEther(tokens?.toString());
  //     console.log(tokensss?.toString(), "tokenssstokenssstokensss");

  //     if (tokensss < 10) {
  //       return toast.error("Please buy minimum One (1) Dollar");
  //     } else if (tokensss > 10000) {
  //       return toast.error("Please buy maximum One Thousand (1000) Dollar");
  //     }

  //     console.log(tokens?.toString(), "tokens?.toString()tokens?.toString()");
  //     console.log(
  //       amountInEthPayable?.toString(),
  //       "tokens?.toString()tokens?.toString()"
  //     );
  //     setloader(true);

  //     const provider = new ethers.providers.Web3Provider(walletProvider);
  //     const signer = provider.getSigner();
  //     const presaleContract = new ethers.Contract(
  //       creedPresaleContractAddress.address,
  //       creedPresaleContract.abi,
  //       signer
  //     );

  //     let amountInWei = ethers.utils.parseEther(amountInEthPayable?.toString());
  //     const buying = await presaleContract.buyWithBNB(tokens?.toString(), {
  //       value: amountInWei?.toString(),
  //     });
  //     buying.wait();
  //     await GetValues();
  //     setloader(false);
  //   } catch (error) {
  //     setloader(false);
  //     console.log(error);
  //     toast.error(`${JSON.stringify(error.reason)}`);
  //   }
  // };

  // const presaleStart = async () => {
  //   try {
  //     setloader(true);

  //     const provider = new ethers.providers.Web3Provider(walletProvider);
  //     const signer = provider.getSigner();
  //     const presaleContract = new ethers.Contract(
  //       creedPresaleContractAddress.address,
  //       creedPresaleContract.abi,
  //       signer
  //     );

  //     const start = await presaleContract.startTheSale();
  //     start.wait();

  //     await GetValues();
  //     setloader(false);
  //   } catch (error) {
  //     setloader(false);
  //     console.log(error);
  //     toast.error(`${JSON.stringify(error.reason)}`);
  //   }
  // };

  // const presaleStop = async () => {
  //   if (!isConnected) {
  //     return toast.error("Please Connect Your Wallet."), setloader(false);
  //   }
  //   try {
  //     setloader(true);
  //     const provider = new ethers.providers.Web3Provider(walletProvider);
  //     const signer = provider.getSigner();
  //     const presaleContract = new ethers.Contract(
  //       creedPresaleContractAddress.address,
  //       creedPresaleContract.abi,
  //       signer
  //     );

  //     const stop = await presaleContract.stopTheSale();
  //     stop.wait();

  //     await GetValues();
  //     setloader(false);
  //   } catch (error) {
  //     setloader(false);
  //     console.log(error);
  //     toast.error(`${JSON.stringify(error.reason)}`);
  //   }
  // };

  // //////////////////////////////////////////  MASTER CONTRACT STAKING ///////////////////////////////
  // //////////////////////////////////////////  MASTER CONTRACT STAKING ///////////////////////////////
  // //////////////////////////////////////////  MASTER CONTRACT STAKING ///////////////////////////////
  // //////////////////////////////////////////  MASTER CONTRACT STAKING ///////////////////////////////
  // //////////////////////////////////////////  MASTER CONTRACT STAKING ///////////////////////////////
  // //////////////////////////////////////////  MASTER CONTRACT STAKING ///////////////////////////////

  // const getMasterContractData = async () => {
  //   console.log("dasdfasdasddddddddddddddddddddd");
  //   const totalStakedTokens =
  //     await getProviderMasterContract().totalStakedTokens();
  //   const totalStakers = await getProviderMasterContract().totalInvesters();
  //   console.log(
  //     totalStakedTokens?.toString(),
  //     totalStakers?.toString(),
  //     "dadasdasdddddddddddddddddddddd"
  //   );
  //   setMasterContractData((prevState) => ({
  //     ...prevState,
  //     totalStakeAmount: ethers.utils
  //       .formatEther(totalStakedTokens?.toString())
  //       ?.toString(),
  //     totalStakers: totalStakers?.toString(),
  //   }));
  // };

  // const GetInvestedTokensWithdrawRequests = async () => {
  //   setloader(true);

  //   let withdrawalDeta = [];

  //   const investedwithdrawRequesters =
  //     await getProviderMasterContract().getWithdrawRequesters();

  //   console.log(investedwithdrawRequesters, "investedwithdrawRequesters");
  //   console.log(
  //     investedwithdrawRequesters?.length?.toString(),
  //     "investedwithdrawRequesters"
  //   );

  //   if (+investedwithdrawRequesters?.length?.toString() > 0) {
  //     for (let i = 0; i < investedwithdrawRequesters?.length; i++) {
  //       let userAddress = investedwithdrawRequesters[i];

  //       console.log(userAddress, "userAddress");

  //       let amountTobe =
  //         await getProviderMasterContract().invetedTokenWithdrawRequest(
  //           userAddress
  //         );

  //       console.log(amountTobe?.toString(), "amountTobeamountTobe");
  //       const Data = {
  //         address: userAddress,
  //         amount: amountTobe?.toString(),
  //       };

  //       withdrawalDeta.push(Data);
  //     }

  //     setWithdrawInvestedTokensRequests(withdrawalDeta);
  //   }

  //   setloader(false);
  // };

  // const GetTotalRewardEarned = async () => {
  //   try {
  //     setloader(true);

  //     let RewardAmount = [];

  //     const getTokensInvesters =
  //       await getProviderMasterContract().getTokensInvesters();

  //     for (let i = 0; i < getTokensInvesters.length; i++) {
  //       let userAddress = getTokensInvesters[i];

  //       let reward = await getProviderMasterContract().rewardedTokens(
  //         userAddress
  //       );

  //       const Data = {
  //         amount: reward?.toString(),
  //       };
  //       RewardAmount.push(Data);
  //     }

  //     // Calculate total amount
  //     const totalAmount = RewardAmount.reduce((total, data) => {
  //       // Convert amount to number and add to total
  //       return total + parseFloat(data.amount);
  //     }, 0); // Initialize total with 0

  //     setMasterContractData((prevState) => ({
  //       ...prevState,
  //       totalRewards: ethers.utils
  //         .formatEther(totalAmount?.toString())
  //         ?.toString(),
  //     }));

  //     setloader(false);
  //   } catch (error) {
  //     setloader(false);
  //     console.log(error);
  //     toast.error(`${JSON.stringify(error.reason)}`);
  //   }
  // };

  // const getStakedInfoByUser = async () => {
  //   console.log(address, isConnected, "addressaddress");
  //   if (isConnected) {
  //     const provider = new ethers.providers.Web3Provider(walletProvider);
  //     const signer = provider.getSigner();
  //     const masterContract = new ethers.Contract(
  //       creedMasterContractAddress.address,
  //       creedMasterContract.abi,
  //       signer
  //     );
  //     let info = await masterContract.stakingInfo(address?.toString());
  //     let earnedRewardTokens = await masterContract.rewardedTokens(
  //       address?.toString()
  //     );
  //     console.log(info, "addressaddrssssassadddess");
  //     console.log(info?.stakedTokens?.toString(), "addressaddrssssassadddess");
  //     console.log(info?.startTime?.toString(), "addressaddrssssassadddess");
  //     console.log(info.duration?.toString(), "addressaddrssssassadddess");
  //     console.log(info?.rewardEarned?.toString(), "addressaddrssssassadddess");

  //     setContractData((prevState) => ({
  //       ...prevState,
  //       stakedTokens: ethers.utils
  //         .formatEther(info?.stakedTokens?.toString())
  //         ?.toString(),
  //       startTime: info?.startTime?.toString(),
  //       duration: info.duration?.toString() * 1000,
  //       ClaimedReward: ethers.utils
  //         .formatEther(info?.rewardEarned?.toString())
  //         ?.toString(),
  //       rewardEarned: ethers.utils
  //         .formatEther(earnedRewardTokens?.toString())
  //         ?.toString(),
  //     }));
  //   }
  // };

  // const StakeTokensSend = async (amount, duration) => {
  //   setloader(true);
  //   if (!isConnected) {
  //     return toast.error("Please Connect Your Wallet."), setloader(false);
  //   }
  //   try {
  //     if (amount <= 0)
  //       return setloader(false), toast.error("Please enter amount");

  //     const provider = new ethers.providers.Web3Provider(walletProvider);
  //     const signer = provider.getSigner();
  //     const masterContract = new ethers.Contract(
  //       creedMasterContractAddress.address,
  //       creedMasterContract.abi,
  //       signer
  //     );
  //     const creedContracts = new ethers.Contract(
  //       creedCoinAddress.address,
  //       creedCoin.abi,
  //       signer
  //     );

  //     const tokens = ethers.utils.parseEther(amount?.toString());

  //     let balance = await creedContracts.balanceOf(address);
  //     let allow = await creedContracts.allowance(
  //       address,
  //       creedMasterContractAddress?.address
  //     );

  //     // console.log(allow?.toString(),balance?.toString(),"allowallowallow");

  //     if (+tokens?.toString() > +balance?.toString())
  //       return (
  //         setloader(false),
  //         toast.error(
  //           `Your available balance is ${Number(
  //             ethers.utils.formatEther(balance?.toString())
  //           )?.toFixed(5)} $Creed`
  //         )
  //       );

  //     if (+tokens?.toString() > +allow?.toString()) {
  //       // console.log("condidtion True")

  //       let approve = await creedContracts.approve(
  //         creedMasterContractAddress.address,
  //         tokens?.toString()
  //       );

  //       await approve.wait();
  //     }

  //     const currentTimestamp = Math.floor(Date.now() / 1000);
  //     const ninetyDaysInSeconds = duration * 24 * 60 * 60; // 90 days in seconds
  //     let days = currentTimestamp + ninetyDaysInSeconds;

  //     let respon = await masterContract.stakeTokens(tokens?.toString(), days);
  //     await respon.wait();
  //     await GetValues();
  //     // setWithdrawInvestedTokensRequests([]);
  //     toast.success("successfuly Staked"); // toast.success("successfuly Minted");
  //     setloader(false);
  //   } catch (error) {
  //     setloader(false);
  //     console.log(error);
  //     toast.error(`${JSON.stringify(error.reason)}`);
  //     return false;
  //   }
  // };

  // const unstakeTokensRequest = async () => {
  //   setloader(true);
  //   if (!isConnected) {
  //     return toast.error("Please Connect Your Wallet."), setloader(false);
  //   }
  //   try {
  //     // if (+contractData?.rewardEarned <= 0)
  //     //   return setloader(false), toast.error("Please wait for End Time");
  //     const provider = new ethers.providers.Web3Provider(walletProvider);
  //     const signer = provider.getSigner();
  //     const masterContract = new ethers.Contract(
  //       creedMasterContractAddress.address,
  //       creedMasterContract.abi,
  //       signer
  //     );

  //     const response = await masterContract.unstakeTokensRequest();
  //     await response.wait();
  //     // await GetValues();
  //     // setWithdrawRequests([]);
  //     // setWithdrawInvestedTokensRequests([]);
  //     // await GetWithdrawRequests();
  //     toast.success("successfuly Requested");
  //     setloader(false);
  //   } catch (error) {
  //     setloader(false);
  //     console.log(error);
  //     toast.error(`${JSON.stringify(error.reason)}`);
  //   }
  // };

  // // const withdrawStakedTokens = async () => {
  // //   setloader(true);
  // //   if (!isWalletConnected) {
  // //     connectWallet();
  // //     return toast.error("Please Connect Your Wallet."), setloader(false);
  // //   }

  // //   const timestamp = Number(stakerData[0]?.stakingEndTime); // Unix timestamp to compare against
  // //   const dateFromTimestamp = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  // //   const currentDate = new Date();

  // //   if (currentDate < dateFromTimestamp)
  // //     return setloader(false), toast.error("please wait for unstaketime ");
  // //   if (+stakerData[0]?.stakedTokens <= 0)
  // //     return setloader(false), toast.error("your staked amount is zero");
  // //   // let balance = await getSignerUSDTContrat().balanceOf(StakingContractAddress.address);
  // //   // if (+balance?.toString() < +stakerData[0]?.stakedTokens) return setloader(false), toast.error("please wait for admin deposit");
  // //   try {
  // //     const response =
  // //       await getSignerStakingContrat().withdrawRequestStakedTokens();
  // //     await response.wait();
  // //     await GetValues();
  // //     setWithdrawRequests([]);
  // //     setWithdrawInvestedTokensRequests([]);
  // //     await GetWithdrawRequests();
  // //     toast.success("successfuly Withdraw");
  // //     setloader(false);
  // //   } catch (error) {
  // //     setloader(false);
  // //     toast.error(`${JSON.stringify(error.reason)}`);
  // //     console.log(error);
  // //   }
  // // };

  // // const rewardDistributed = async (amount) => {
  // //   setloader(true);
  // //   if (!isWalletConnected) {
  // //     connectWallet();
  // //     return toast.error("Please Connect Your Wallet."), setloader(false);
  // //   }
  // //   try {
  // //     // if (currentRound.toString() == 4) return setloader(false), setError(true), setMessage("All the rounds have finished"); //toast.error("All the rounds have finished");
  // //     let tokens = ethers.utils.parseEther(amount);
  // //     if (totalStakers == 0)
  // //       return setloader(false), toast.error("Please wait for investers");
  // //     const response = await getSignerStakingContrat().rewardDistributed(
  // //       tokens?.toString()
  // //     );
  // //     await response.wait();
  // //     await GetValues();
  // //     setWithdrawRequests([]);
  // //     setWithdrawInvestedTokensRequests([]);
  // //     await GetWithdrawRequests();
  // //     toast.success("successfuly Distributed");
  // //     setloader(false);
  // //   } catch (error) {
  // //     setloader(false);
  // //     toast.error(`${JSON.stringify(error.reason)}`);
  // //     console.log(error);
  // //   }
  // // };

  // const acceptWithdrawTokenRequest = async (addresses, amount) => {
  //   setloader(true);
  //   if (!isConnected) {
  //     return toast.error("Please Connect Your Wallet."), setloader(false);
  //   }
  //   try {
  //     const provider = new ethers.providers.Web3Provider(walletProvider);
  //     const signer = provider.getSigner();
  //     const masterContract = new ethers.Contract(
  //       creedMasterContractAddress.address,
  //       creedMasterContract.abi,
  //       signer
  //     );

  //     const creedContracts = new ethers.Contract(
  //       creedCoinAddress.address,
  //       creedCoin.abi,
  //       signer
  //     );

  //     let approve = await creedContracts.approve(
  //       creedMasterContractAddress.address,
  //       amount?.toString()
  //     );
  //     await approve.wait();
  //     const response = await masterContract.acceptWithdrawTokenRequest(
  //       addresses
  //     );
  //     await response.wait();
  //     // await GetValues();
  //     // setWithdrawRequests([]);
  //     // setWithdrawInvestedTokensRequests([]);
  //     // await GetWithdrawRequests();
  //     toast.success("successfuly Withdraw");
  //     setloader(false);
  //   } catch (error) {
  //     setloader(false);
  //     toast.error(`${JSON.stringify(error.reason)}`);
  //     console.log(error);
  //   }
  // };

  // //////////////////////////////////////////  MASTER CONTRACT PROPOSAL ///////////////////////////////
  // //////////////////////////////////////////  MASTER CONTRACT PROPOSAL ///////////////////////////////
  // //////////////////////////////////////////  MASTER CONTRACT PROPOSAL ///////////////////////////////
  // //////////////////////////////////////////  MASTER CONTRACT PROPOSAL ///////////////////////////////
  // //////////////////////////////////////////  MASTER CONTRACT PROPOSAL ///////////////////////////////
  // //////////////////////////////////////////  MASTER CONTRACT PROPOSAL ///////////////////////////////

  // const submitProposal = async (data) => {
  //   setloader(true);
  //   if (!isConnected) {
  //     return toast.error("Please Connect Your Wallet."), setloader(false);
  //   }
  //   try {
  //     const provider = new ethers.providers.Web3Provider(walletProvider);
  //     const signer = provider.getSigner();
  //     const masterContract = new ethers.Contract(
  //       creedMasterContractAddress.address,
  //       creedMasterContract.abi,
  //       signer
  //     );

  //     const response = await masterContract.submitProposal(data);
  //     await response.wait();
  //     // await GetValues();
  //     // setWithdrawRequests([]);
  //     // setWithdrawInvestedTokensRequests([]);
  //     // await GetWithdrawRequests();
  //     toast.success("successfuly Submited");
  //     GetAllProposalByArray();
  //     setloader(false);
  //   } catch (error) {
  //     setloader(false);
  //     toast.error(`${JSON.stringify(error.reason)}`);
  //     console.log(error);
  //   }
  // };

  // const GetAllProposalByArray = async () => {
  //   try {
  //     setloader(true);
  //     let RewardAmount = [];

  //     const proposalCount = await getProviderMasterContract().proposalCount();
  //     console.log(proposalCount?.toString(), "proposalCount?.toString()");

  //     for (let i = 1; i <= proposalCount?.toString(); i++) {
  //       console.log("proposalCount");

  //       let reward = await getProviderMasterContract().proposals(i);
  //       console.log(reward, "rewardrewardreward");

  //       const decryptData = (ciphertext) => {
  //         try {
  //           const bytes = CryptoJS.AES.decrypt(ciphertext, "secret-key");
  //           const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //           return decryptedData;
  //         } catch (error) {
  //           console.error("Error decrypting data:", error);
  //           return null;
  //         }
  //       };

  //       let title = decryptData(reward?.description?.toString());

  //       const Data = {
  //         proposer: reward.proposer?.toString(),
  //         description: title,
  //         startTime: reward.startTime?.toString(),
  //         endTime: reward.endTime?.toString(),
  //         votes: reward.votes?.toString(),
  //         yesVotes: reward.yesVotes?.toString(),
  //         noVotes: reward.noVotes?.toString(),
  //         executed: reward.executed?.toString(),
  //         proposerId: i,
  //       };
  //       console.log(Data, "Data");
  //       RewardAmount.push(Data);
  //     }
  //     setMasterContractProposalData(RewardAmount);
  //     setloader(false);
  //   } catch (error) {
  //     setloader(false);
  //     console.log(error);
  //   }
  // };

  // const addingVote = async (votingId, status) => {
  //   if (!isConnected) {
  //     return toast.error("Please Connect Your Wallet."), setloader(false);
  //   }

  //   try {
  //     setloader(true);
  //     const provider = new ethers.providers.Web3Provider(walletProvider);
  //     const signer = provider.getSigner();
  //     let masterContract = new ethers.Contract(
  //       creedMasterContractAddress.address,
  //       creedMasterContract.abi,
  //       signer
  //     );

  //     if (status === 0) {
  //       const totalProposalLists = await masterContract.vote(votingId, false);
  //       totalProposalLists.wait();
  //       setloader(false);
  //     } else {
  //       const totalProposalLists = await masterContract.vote(votingId, true);
  //       totalProposalLists.wait();
  //       setloader(false);
  //     }
  //     GetAllProposalByArray();
  //     setloader(false);
  //   } catch (error) {
  //     setloader(false);
  //     console.log(error);
  //     toast.error(`${JSON.stringify(error.reason)}`);
  //   }
  // };

  // //////////////////////////////////////////  Bridge CONTRACT Functions ///////////////////////////////
  // //////////////////////////////////////////  Bridge CONTRACT Functions ///////////////////////////////
  // //////////////////////////////////////////  Bridge CONTRACT Functions ///////////////////////////////
  // //////////////////////////////////////////  Bridge CONTRACT Functions ///////////////////////////////

  // const LockDeposit = async (amount, from, to) => {
  //   try {
  //     if (from === 56 && to == 1) {
  //       if (chainId != from) {
  //         //BNB
  //         return toast.error("Please change Network to BNB Smart Chain");
  //       }
  //       const provider = new ethers.providers.Web3Provider(walletProvider);
  //       const signer = provider.getSigner();
  //       //ETH
  //       const creedBNBMainBridge = new ethers.Contract(
  //         CreedBNBBridgeAddress.address,
  //         CreedBNBBridge.abi,
  //         signer
  //       );
  //       const creedToken = new ethers.Contract(
  //         creedCoinAddress.address,
  //         creedCoin.abi,
  //         signer
  //       );
  //       let burnAmount = ethers.utils.parseEther(amount?.toString());
  //       let tokensApproved = await creedToken.allowance(
  //         address,
  //         CreedBNBBridgeAddress.address
  //       );
  //       if (tokensApproved < burnAmount) {
  //         let tokens = ethers.utils.parseEther("3000000000000000");
  //         let tx = await creedToken.approve(
  //           CreedBNBBridgeAddress.address,
  //           tokens
  //         );
  //         await tx.wait();
  //       }
  //       let tx = await creedBNBMainBridge.lockDeposit(burnAmount, to); //TODO change wanted chain
  //       await tx.wait();
  //     } else if (from === 56 && to == 137) {
  //       if (chainId != from) {
  //         //BNB
  //         return toast.error("Please change Network to BNB Smart Chain");
  //       }
  //       const provider = new ethers.providers.Web3Provider(walletProvider);
  //       const signer = provider.getSigner();
  //       //ETH
  //       const creedBNBMainBridge = new ethers.Contract(
  //         CreedBNBBridgeAddress.address,
  //         CreedBNBBridge.abi,
  //         signer
  //       );
  //       const creedToken = new ethers.Contract(
  //         creedCoinAddress.address,
  //         creedCoin.abi,
  //         signer
  //       );
  //       let burnAmount = ethers.utils.parseEther(amount?.toString());
  //       let tokensApproved = await creedToken.allowance(
  //         address,
  //         CreedBNBBridgeAddress.address
  //       );
  //       if (tokensApproved < burnAmount) {
  //         let tokens = ethers.utils.parseEther("3000000000000000");
  //         let tx = await creedToken.approve(
  //           CreedBNBBridgeAddress.address,
  //           tokens
  //         );
  //         await tx.wait();
  //       }
  //       let tx = await creedBNBMainBridge.lockDeposit(burnAmount, to); //TODO change wanted chain
  //       await tx.wait();
  //     } else if (from === 56 && to == 1000) {
  //       if (chainId != from) {
  //         //Tron
  //         return toast.error("Please change Network to BNB Smart Chain");
  //       } else if (!tronWalletForBridge) {
  //         return toast.error("Please input Tron wallet Address");
  //       }
  //       const provider = new ethers.providers.Web3Provider(walletProvider);
  //       const signer = provider.getSigner();

  //       const creedBNBMainBridge = new ethers.Contract(
  //         CreedBNBBridgeAddress.address,
  //         CreedBNBBridge.abi,
  //         signer
  //       );
  //       const creedToken = new ethers.Contract(
  //         creedCoinAddress.address,
  //         creedCoin.abi,
  //         signer
  //       );

  //       let burnAmount = ethers.utils.parseEther(amount?.toString());

  //       let tokensApproved = await creedToken.allowance(
  //         address,
  //         CreedBNBBridgeAddress.address
  //       );
  //       if (tokensApproved < burnAmount) {
  //         let tokens = ethers.utils.parseEther("3000000000000000");
  //         let tx = await creedToken.approve(
  //           CreedBNBBridgeAddress.address,
  //           tokens
  //         );
  //         await tx.wait();
  //       }

  //       let tx = await creedBNBMainBridge.lockDeposit(burnAmount, to); //TODO change wanted chain
  //       await tx.wait();

  //       let apiData = {
  //         from: address,
  //         to: tronWalletForBridge,
  //         amount: burnAmount?.toString(),
  //         date: new Date(),
  //         chainId: to,
  //       };
  //       await apis.swapTokenForTronBridge(apiData);
  //       //await apis.lockForTronUpdate(apiData);
  //     }
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // };

  // const unLockDeposit = async (amount, from, to) => {
  //   try {
  //     if (from === 1 && to == 56) {
  //       if (chainId != from) {
  //         //ETHEREUM
  //         return toast.error("Please change network to Ethereum chain");
  //       }
  //       const provider = new ethers.providers.Web3Provider(walletProvider);
  //       const signer = provider.getSigner();

  //       const wrappedETHBridge = new ethers.Contract(
  //         WrappedETHBridgeAddress.address,
  //         WrappedETHBridge.abi,
  //         signer
  //       );
  //       const wrappedToken = new ethers.Contract(
  //         WrappedETHTokenAddress.address,
  //         WrappedETHToken.abi,
  //         signer
  //       );

  //       let tokens = ethers.utils.parseEther("300000000000000");
  //       let tokensApproved = await wrappedToken.allowance(
  //         address,
  //         WrappedETHBridgeAddress.address
  //       );

  //       if (tokensApproved < tokens) {
  //         let tx = await wrappedToken.approve(
  //           WrappedETHBridgeAddress.address,
  //           tokens
  //         );
  //         await tx.wait();
  //       }
  //       let burnAmount = ethers.utils.parseEther(amount?.toString());
  //       let tx = await wrappedETHBridge.burn(address, burnAmount, to); //TODO change wanted chain
  //       await tx.wait();
  //     } else if (from === 137 && to == 56) {
  //       if (chainId != from) {
  //         //ETHEREUM
  //         return toast.error("Please change network to Polygon chain");
  //       }
  //       const provider = new ethers.providers.Web3Provider(walletProvider);
  //       const signer = provider.getSigner();

  //       //WrappedPolygonTokenAddress
  //       //WrappedPolygonBridgeAddress

  //       const wrappedPolyBridge = new ethers.Contract(
  //         WrappedPolygonBridgeAddress.address,
  //         WrappedETHBridge.abi,
  //         signer
  //       );
  //       const wrappedToken = new ethers.Contract(
  //         WrappedPolygonTokenAddress.address,
  //         WrappedETHToken.abi,
  //         signer
  //       );

  //       let tokens = ethers.utils.parseEther("300000000000000");
  //       let tokensApproved = await wrappedToken.allowance(
  //         address,
  //         WrappedPolygonBridgeAddress.address
  //       );

  //       if (tokensApproved < tokens) {
  //         let tx = await wrappedToken.approve(
  //           WrappedPolygonBridgeAddress.address,
  //           tokens
  //         );
  //         await tx.wait();
  //       }
  //       let burnAmount = ethers.utils.parseEther(amount?.toString());
  //       let tx = await wrappedPolyBridge.burn(address, burnAmount, to); //TODO change wanted chain
  //       await tx.wait();
  //     } else if (from === 1000 && to == 56) {
  //       if (!tronConnected) {
  //         //Tron TODO:
  //         return toast.error("Please Connect Tron wallet");
  //       } else if (!tronWalletForBridge) {
  //         return toast.error("Please Insert BNB wallet");
  //       }

  //       // let resultToken = await TronWrappedCreedContract.approve("TQHVAmS6CoDuDfM74kGyAuHM1zuGDzQri9",tokens?.toString()).send({
  //       //   feeLimit:100_000_000,
  //       //   callValue:0,
  //       //   shouldPollResponse:true
  //       // });
  //       // // await result.wait();
  //       // console.log(resultToken, "resultTokenresultTokenresultToken");

  //       // let result = await TronWrappedBridgeContract.burn("TUQvyTGrZkqgVQrWP8gwJH1tce8cfp8yuX",tokens?.toString(),1,1000).send({
  //       //     feeLimit:100_000_000,
  //       //     callValue:0,
  //       //     shouldPollResponse:true
  //       //   });

  //       //   console.log(result, "resultresultresultresult2");

  //       let TronWrappedCreedContract = await window.tronWeb
  //         .contract()
  //         .at(WrappedTronTokenAddress.address);
  //       console.log("check");

  //       let tokens = ethers.utils.parseEther("300000000000000");
  //       let tokensApproved = await TronWrappedCreedContract.allowance(
  //         tronCurrentAccount,
  //         WrappedTronBridgeAddress.address
  //       );

  //       if (tokensApproved < tokens) {
  //         await TronWrappedCreedContract.approve(
  //           WrappedTronBridgeAddress.address,
  //           tokens
  //         ).send({
  //           feeLimit: 100_000_000,
  //           callValue: 0,
  //           shouldPollResponse: true,
  //         });
  //       }

  //       let burnAmount = ethers.utils.parseEther(amount?.toString());
  //       console.log("transaction2");
  //       let TronWrappedBridgeContract = await window.tronWeb
  //         .contract()
  //         .at(WrappedTronBridgeAddress.address);

  //       console.log("transaction3");

  //       await TronWrappedBridgeContract.burn(
  //         tronWalletForBridge,
  //         burnAmount,
  //         to
  //       ).send({
  //         feeLimit: 100_000_000,
  //         callValue: 0,
  //         shouldPollResponse: true,
  //       });
  //       console.log("transaction40,", tronCurrentAccount);
  //     }
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // };

  // async function getUser() {
  //   try {
  //     const response = await axios.get(
  //       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
  //     );
  //     console.log(response.data, "data");
  //     setCoin(response.data);
  //   } catch (error) {
  //     console.error(error, "data");
  //   }
  // }



  // useEffect(() => {
  //   GetValues();
  //   // GetTotalRewardEarned();
  //   GetAllProposalByArray();
  //   // GetInvestedTokensWithdrawRequests();
  // }, [address]);

  return (
    <>
      <Store.Provider
        value={
          {
            isRegistered,
            GetIsUserRegistered,
            registerNewUser,
            // coin,
            // loader,
            // setloader,
            // LockDeposit,
            // unLockDeposit,
            // GetAllProposalByArray,
            // contractData,
            // addTokenToMetamask,
            // tronCurrentAccount,
            // setTronCurrentAccount,
            // tronWalletForBridge,
            // setTronWalletForBridge,
            // copyToClipboard,
            // GetValues,
            // getProviderPresaleContract,
            // unstakeTokensRequest,
            // BuyWithUSDTandUSDC,
            // BuyWithETH,
            // presaleStart,
            // presaleStop,
            // StakeTokensSend,
            // getStakedInfoByUser,
            // masterContractData,
            // GetTotalRewardEarned,
            // getMasterContractData,
            // submitProposal,
            // proposal,
            // masterContractProposalData,
            // GetInvestedTokensWithdrawRequests,
            // acceptWithdrawTokenRequest,
            // addingVote,
            // withdrawInvestedTokensRequests,
            // tronConnected,
            // setTronConnected,
          }
        }
      >
        {children}
      </Store.Provider>
    </>
  );
};
