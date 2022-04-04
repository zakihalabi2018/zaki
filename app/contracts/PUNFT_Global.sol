pragma solidity ^0.8.4;

import "./ERC721Full.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract PUNFT_Global is ERC721Full,Ownable
{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 TokenSupply;

    address public contractAddress;
     mapping(bytes32 => bool) _NFTExists;
  
    mapping(uint256 => address payable) private WhoMintNft;
    mapping(uint256 => uint) private PriceOfEachNFT;

      event Sent(
    address indexed from,
    address indexed to,
    uint256 tokenId
  );

    
  constructor (string memory namee, string memory symboll) ERC721Full(namee,symboll){
      TokenSupply = 0;
      contractAddress = address(this);
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
    //mint new NFT
    function mint(string memory SBF, string memory EBF,
     uint price,string memory Location) public onlyOwner returns (uint256) {

       require(!_NFTExists[hashNFT(SBF, EBF,Location)]);
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
