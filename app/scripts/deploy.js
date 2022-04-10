
const hre = require("hardhat");

async function main() {
  
 const Greeter = await hre.ethers.getContractFactory("PUNFT_Global");
  const greeter = await Greeter.deploy("NFTP","NFTP");

  const Greeter2 = await hre.ethers.getContractFactory("PUBNFT_PU");
  const greeter2 = await Greeter2.deploy(greeter.address);

  await greeter2.deployed();

  console.log("Autoritaire deployed to:", greeter2.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
