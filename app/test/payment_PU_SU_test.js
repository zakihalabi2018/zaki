const { Web3Provider } = require("@ethersproject/providers");
const { expect } = require("chai");

describe('PUBNFT_SU contract', async () => {

    let Token,Payment,Token2,Payment2;
    let PUNFT,PUBNFT,PUNFTSU,PUBNFTSU;
    let addr1, addr2,addr3,addr4,addrs;

    beforeEach(async function () {
        [owner, addr1, addr2, addr3, addr4,...addrs] = await ethers.getSigners();
        Token = await ethers.getContractFactory("PUNFT_Global");    
        PUNFT = await Token.deploy("NFTP","NFTP");
        Payment = await ethers.getContractFactory("PUBNFT_PU"); 
        PUBNFT = await Payment.deploy(PUNFT.address);

       
    });

    describe("Payment", function () {

        it("mint NFT For SU  transfert To PaymentContract SU", async function () {

            await PUNFT.mint("100", "300", 40, "Oran");
            const ownerAdrs=await PUNFT.ownerOf(1);
            await PUNFT["safeTransferFrom(address,address,uint256)"](ownerAdrs,PUBNFT.address,1);
            await PUBNFT.connect(addr1).purchaseToken(1,{value: ethers.utils.parseEther("40")});
            //await PUBNFT["purchaseToken(uint256)"](1,{from:addr1.address,value: ethers.utils.parseEther("40")});
            expect(await PUNFT.ownerOf(1)).to.equal(addr1.address);
            
            Token2 = await ethers.getContractFactory("PUNFT_SU");    
            PUNFTSU = await Token2.connect(addr1).deploy(PUNFT.address,1,"NFTP","NFTP");
            Payment2 = await ethers.getContractFactory("PUBNFT_PU"); 
            PUBNFTSU = await Payment2.connect(addr1).deploy(PUNFTSU.address);
            
            const idt = await PUNFTSU.mint("120", "130", 40, "Oran");
            const ownerAdrs2=await PUNFTSU.ownerOf(1);
           
            await PUNFTSU["safeTransferFrom(address,address,uint256)"](ownerAdrs2,PUBNFTSU.address,1);
            expect(await PUNFTSU.ownerOf(1)).to.equal(PUBNFTSU.address);
            
        });
      });

      it("Send The Ether and Get NFT From PU To SU", async function () {

        await PUNFT.mint("100", "300", 40, "Oran");
        const ownerAdrs=await PUNFT.ownerOf(1);
        await PUNFT["safeTransferFrom(address,address,uint256)"](ownerAdrs,PUBNFT.address,1);
        await PUBNFT.connect(addr1).purchaseToken(1,{value: ethers.utils.parseEther("40")});
        //await PUBNFT["purchaseToken(uint256)"](1,{from:addr1.address,value: ethers.utils.parseEther("40")});
        //expect(await PUNFT.ownerOf(1)).to.equal(addr1.address);

        Token2 = await ethers.getContractFactory("PUNFT_SU");    
        PUNFTSU = await Token2.connect(addr1).deploy(PUNFT.address,1,"NFTP","NFTP");
        Payment2 = await ethers.getContractFactory("PUBNFT_PU"); 
        PUBNFTSU = await Payment2.connect(addr1).deploy(PUNFTSU.address);
        let idt = await PUNFTSU.mint("120", "130", 40, "Oran");
        const ownerAdrs2=await PUNFTSU.ownerOf(1);
        await PUNFTSU["safeTransferFrom(address,address,uint256)"](ownerAdrs2,PUBNFTSU.address,1);
       // expect(await PUNFTSU.ownerOf(idt)).to.equal(PUBNFTSU.address);
        //expect(await PUNFTSU.totalsupply()).to.equal(1);

        await PUBNFTSU.connect(addr2).purchaseToken(1,{value: ethers.utils.parseEther("40")});
        //await PUBNFT["purchaseToken(uint256)"](1,{from:addr1.address,value: ethers.utils.parseEther("40")});
        expect(await PUNFTSU.ownerOf(1)).to.equal(addr2.address);

     });

     describe('SU mallious', async () => {  
     it("SU try to make him self PU", async function () {

        await PUNFT.mint("100", "300", 40, "Oran");
        const ownerAdrs=await PUNFT.ownerOf(1);
        await PUNFT["safeTransferFrom(address,address,uint256)"](ownerAdrs,PUBNFT.address,1);
        await PUBNFT.connect(addr1).purchaseToken(1,{value: ethers.utils.parseEther("40")});
        //await PUBNFT["purchaseToken(uint256)"](1,{from:addr1.address,value: ethers.utils.parseEther("40")});
        //expect(await PUNFT.ownerOf(1)).to.equal(addr1.address);

        Token2 = await ethers.getContractFactory("PUNFT_SU");    
        PUNFTSU = await Token2.connect(addr1).deploy(PUNFT.address,1,"NFTP","NFTP");
        Payment2 = await ethers.getContractFactory("PUBNFT_PU"); 
        PUBNFTSU = await Payment2.connect(addr1).deploy(PUNFTSU.address);
        let idt = await PUNFTSU.mint("120", "130", 40, "Oran");
        const ownerAdrs2=await PUNFTSU.ownerOf(1);
        await PUNFTSU["safeTransferFrom(address,address,uint256)"](ownerAdrs2,PUBNFTSU.address,1);
       // expect(await PUNFTSU.ownerOf(idt)).to.equal(PUBNFTSU.address);
        //expect(await PUNFTSU.totalsupply()).to.equal(1);

        await PUBNFTSU.connect(addr2).purchaseToken(1,{value: ethers.utils.parseEther("40")});
        //await PUBNFT["purchaseToken(uint256)"](1,{from:addr1.address,value: ethers.utils.parseEther("40")});
        //expect(await PUNFTSU.ownerOf(1)).to.equal(addr2.address);
        
        await expect(await Token2.connect(addr2).deploy(PUNFT.address,1,"NFTP","NFTP"))
        .to.be.revertedWith('Your note the owner Of this NFT');

     });
});
});