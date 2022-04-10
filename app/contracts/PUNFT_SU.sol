pragma solidity ^0.8.4;

import "./ERC721Full.sol";
import "./PUNFT_Global.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract PUNFT_SU is ERC721Full,Ownable
{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 TokenSupply;

    PUNFT_Global public nftAddress;
    metadata Global_NFT;
    address public contractAddress;
    mapping(bytes32 => bool) _NFTExists;
  
    mapping(uint256 => address payable) private WhoMintNft;
    mapping(uint256 => uint) private PriceOfEachNFT;
    
      event Sent(
    address indexed from,
    address indexed to,
    uint256 tokenId
  );


  constructor (address _nftAddress,uint256 tokenId,string memory namee, string memory symboll) ERC721Full(namee,symboll){
      nftAddress = PUNFT_Global(_nftAddress);
      require(nftAddress.chechifexist(tokenId), "You token is not existe");
      require(msg.sender == nftAddress.ownerOf(tokenId),"Your note the owner Of this NFT");
      TokenSupply = 0;
      contractAddress = address(this);
      Global_NFT = nftAddress.MetaDataToNFT(tokenId);
  }

      function hashNFT(
        string memory SBF,
        string memory EBF,
        string memory Location
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(SBF,EBF,Location));
    }
   

    event ReceiveEth(
    address indexed from,
    address indexed to,
    uint amountEth
  );
  function whoMintthis(uint256 tokenId) public view returns (address payable) {
        return WhoMintNft[tokenId];
   }

   function getpriceForNFT(uint256 tokenId) public view returns (uint) {
        return PriceOfEachNFT[tokenId];
   }
    function totalSupply() public view returns (uint256) {
        return TokenSupply;
    }
    

    function stringToUint(string memory numString) public pure returns(uint) {
        uint  val=0;
        bytes   memory stringBytes = bytes(numString);
        for (uint  i =  0; i<stringBytes.length; i++) {
            uint exp = stringBytes.length - i;
            bytes1 ival = stringBytes[i];
            uint8 uval = uint8(ival);
           uint jval = uval - uint(0x30);
   
           val +=  (uint(jval) * (10**(exp-1))); 
        }
      return val;
    }

    function compareStrings(string memory a, string memory b) public view returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
}

    //mint new NFT
    function mint(string memory SBF, string memory EBF,
     uint price,string memory Location) public onlyOwner returns (uint256) {
       require(stringToUint(SBF) >= stringToUint(Global_NFT.SBF),"You not allow to use this Bande");
       require(stringToUint(EBF) <= stringToUint(Global_NFT.EBF),"You not allow to use this Bande");
       require(compareStrings(Location,Global_NFT.Location),"You not allow to use this Bande");
       
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setMetaData(newItemId, SBF,EBF,price,Location);
         WhoMintNft[newItemId] = payable(msg.sender);
        PriceOfEachNFT[newItemId] = price;
        _NFTExists[hashNFT(SBF, EBF,Location)] = true;
        TokenSupply++;
        return newItemId;
    }

    function mintTo(address _to,string memory SBF, string memory EBF,
     uint price,string memory Location) public onlyOwner returns (uint256) {

       require(!_NFTExists[hashNFT(SBF, EBF,Location)]);
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_to, newItemId);
        _setMetaData(newItemId, SBF,EBF,price,Location);
         WhoMintNft[newItemId] = payable(_to);
        PriceOfEachNFT[newItemId] = price;
        _NFTExists[hashNFT(SBF, EBF,Location)] = true;
        TokenSupply++;
        return newItemId;
    }
    /*
    
    function mint(address player, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
    */

    function setMetaData(uint256 tokenId,  string memory SBF, string memory EBF,
     uint price,string memory Location) public onlyOwner {
          require(_exists(tokenId), "ERC721Metadata: Metadata set of nonexistent token");
           _setMetaData(tokenId, SBF,EBF,price,Location);
     }

    function getStartBF(uint256 tokenId) public view returns (string memory) {
     string memory SBF=Start_BF(tokenId);
         return SBF;
    }
    function getEndtBF(uint256 tokenId) public view returns (string memory) {
     string memory EBF=End_BF(tokenId);
         return EBF;
    }
     function getLocalBF(uint256 tokenId) public view returns (string memory) {
     string memory LBF=Location_Of_Token(tokenId);
         return LBF;
    }

    function getPrixBF(uint256 tokenId) public view returns (uint) {
        uint PBF=Price_Of_Token(tokenId);
         return PBF;
    }

    function GetAdress(uint256 tokenId) public view returns (address owner) {
        return ownerOf(tokenId);
    }

  function doSend(
    address _from,
    address _to,
    uint256 tokenId
  )
    internal
  {

     emit Sent(_from, _to,tokenId);
    }
}
