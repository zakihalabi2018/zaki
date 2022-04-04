pragma solidity ^0.8.4;

import "./PUNFT_Global.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";


contract PUBNFT_PU is Ownable, Pausable,IERC721Receiver{

    PUNFT_Global public nftAddress;
    uint256 public currentPrice;
    
    event Sent(address indexed payee, uint256 amount, uint256 balance);
    event Received(
        address indexed payer,
        uint256 tokenId,
        uint256 amount,
        uint256 balance
    );

    
    constructor(address _nftAddress){
        nftAddress = PUNFT_Global(_nftAddress);
        
    }

    /*
    constructor(string memory namee, string memory symboll) {
        nftAddress = new PUNFT_Global(namee, symboll);
    }
    */
    function purchaseToken(uint256 _tokenId) public payable whenNotPaused {
        require(msg.sender != address(0) && msg.sender != owner() && msg.sender != address(this),"address problem your the owner of this NFT");
        require(msg.value >= nftAddress.getpriceForNFT(_tokenId),"amount is less then price of this nft");
        //check if exist
        address tokenSeller = whoMintthis(_tokenId);
        nftAddress.safeTransferFrom(address(this), msg.sender, _tokenId);
        sendTo(payable(tokenSeller),msg.value);
        emit Received(msg.sender, _tokenId, msg.value, address(this).balance);
    }

    function sendTo(address payable _payee, uint256 _amount) private{
        require(_payee != address(0) && _payee != address(this),"Address must not the contract address");
        require(_amount > 0 && _amount <= address(this).balance,"Cant send this amount");
        _payee.transfer(_amount);
        emit Sent(_payee, _amount, address(this).balance);
    }

    function OwnerOf(uint256 token_id) public view returns (address payable own){
        return payable(address(nftAddress.ownerOf(token_id)));
    }

   function whoMintthis(uint256 tokenId) public view returns (address payable) {
        return nftAddress.whoMintthis(tokenId);
   }

    function onERC721Received(address, address, uint256 _tokenId, bytes memory data) public virtual override returns (bytes4) {
        /*
       (uint _price) = abi.decode(data, (uint));   // error here
        
        require(
            _price > 0,
            "Wrong pricing"
        );

        // rest of the code

        */
        return this.onERC721Received.selector;
    }

}
