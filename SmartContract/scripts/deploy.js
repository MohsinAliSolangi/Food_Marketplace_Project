const { ethers } = require("hardhat");

async function main() {
 

  const foodTraceabilityMarketplace = await ethers.getContractFactory("FoodTraceabilityMarketplace");

  // here we deploy the contract
  const FoodTraceabilityMarketplace = await foodTraceabilityMarketplace.deploy();
  // 10 is the Maximum number of whitelisted addresses allowed

  // Wait for it to finish deploying
  await FoodTraceabilityMarketplace.deployed();

  // print the address of the deployed contract
  console.log("FoodTraceabilityMarketplace Contract Address:",
    FoodTraceabilityMarketplace.address
  );



  const foodTraceabilityContract = await ethers.getContractFactory("FoodTraceabilityContract");

  // here we deploy the contract
  const FoodTraceabilityContract = await foodTraceabilityContract.deploy();
  // 10 is the Maximum number of whitelisted addresses allowed

  // Wait for it to finish deploying
  await FoodTraceabilityContract.deployed();

  // print the address of the deployed contract
  console.log("FoodTraceabilityContract Contract Address:",
    FoodTraceabilityContract.address
  );


  saveFrontendFiles(FoodTraceabilityMarketplace, "FoodTraceabilityMarketplace");
  saveFrontendFiles(FoodTraceabilityContract, "FoodTraceabilityContract");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../Frontend/src/Store/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);
  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });