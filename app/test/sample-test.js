const { expect } = require("chai");

describe('PUNFT_Global contract', async () => {
    let Token,Payment;
    let hardhatToken,PaymentContract;
    let addr1, addr2,addrs;
    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        Token = await ethers.getContractFactory("PUNFT_Global");    
        hardhatToken = await Token.deploy("NFTP","NFTP");

        Payment = await ethers.getContractFactory("PUBNFT_PU"); 

        PaymentContract = await Token.deploy("NFTP","NFTP");
      

    });

describe("deplyment", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {

      expect(await hardhatToken.totalSupply()).to.equal(0);
    });
  });

  describe("Minting", function () {
    it("creates a new token NFT", async function () {
     
      const result = await hardhatToken.mint("100", "300", 40, "Oran");
      
      expect(await hardhatToken.totalSupply()).to.equal(1);

    });
  });
  
    describe('transfering', async () => {
        it("creates a new token NFT", async function () {
            const result = await hardhatToken.mint("100", "300", 40, "Oran");
            const result2 = await hardhatToken.mint("500", "600", 40, "Oran");

            expect(await hardhatToken.ownerOf(1)).to.equal(owner.address);
            await hardhatToken["safeTransferFrom(address,address,uint256)"](owner.address,addr1.address,1);

            expect(await hardhatToken.ownerOf(1)).to.equal(addr1.address);

        });
    });
   
});

 //await hardhatToken["safeTransferFrom(address,address,uint256)"](owner.address,addr1.address,1);