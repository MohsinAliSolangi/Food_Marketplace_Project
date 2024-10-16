const { ethers } = require("hardhat");

async function main() {
 

  const foodTraceability = await ethers.getContractFactory("FoodTraceability");

  // here we deploy the contract
  const FoodTraceability = await foodTraceability.deploy();
  // 10 is the Maximum number of whitelisted addresses allowed

  // Wait for it to finish deploying
  await FoodTraceability.deployed();

  // print the address of the deployed contract
  console.log("FoodTraceability Contract Address:",
    FoodTraceability.address
  );



  saveFrontendFiles(FoodTraceability, "FoodTraceability");
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