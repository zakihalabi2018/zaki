const { Web3Provider } = require("@ethersproject/providers");
const { expect } = require("chai");

describe('PUBNFT_PU contract', async () => {

    let Token,Payment;
    let PUNFT,PUBNFT;
    let addr1, addr2,addrs;
    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        Token = await ethers.getContractFactory("PUNFT_Global");    
        PUNFT = await Token.deploy("NFTP","NFTP");
        Payment = await ethers.getContractFactory("PUBNFT_PU"); 
        PUBNFT = await Payment.deploy(PUNFT.address);
    });

    describe("Payment", function () {
        it("mint NFT transfert To PaymentContract", async function () {
    
            await PUNFT.mint("100", "300", 40, "Oran");
            const ownerAdrs=await PUNFT.ownerOf(1);
            await PUNFT["safeTransferFrom(address,address,uint256)"](ownerAdrs,PUBNFT.address,1);
            expect(await PUNFT.ownerOf(1)).to.equal(PUBNFT.address);
            
        });

        it("Send The Ether and Get NFT", async function () {
            await PUNFT.mint("100", "300", 40, "Oran");
            const ownerAdrs=await PUNFT.ownerOf(1);
            await PUNFT["safeTransferFrom(address,address,uint256)"](ownerAdrs,PUBNFT.address,1);
            await PUBNFT.connect(addr1).purchaseToken(1,{value: ethers.utils.parseEther("40")});
            //await PUBNFT["purchaseToken(uint256)"](1,{from:addr1.address,value: ethers.utils.parseEther("40")});
            expect(await PUNFT.ownerOf(1)).to.equal(addr1.address);
        });

      });

      });