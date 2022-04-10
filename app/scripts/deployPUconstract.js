
const hre = require("hardhat");

async function main() {
  
    const ticketContract = await hre.ethers.getContractFactory("PUNFT_SU");
    const ticket = await ticketContract.deploy('0x5FbDB2315678afecb367f032d93F642f64180aa3', ID, "NFTP", "NFTP");
    await ticket.deployed();
    console.log("Ticket Contract deployed to:", ticket.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
