pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract ERC721Full is ERC721
{

  
    struct metadata {
      string SBF;
      string EBF;
      uint   price;
      string Location;
    }


    
    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

     mapping(uint256 => metadata) private _metadata;

    /*
     *     bytes4(keccak256('name()')) == 0x06fdde03
     *     bytes4(keccak256('symbol()')) == 0x95d89b41
     *     bytes4(keccak256('tokenURI(uint256)')) == 0xc87b56dd
     *
     *     => 0x06fdde03 ^ 0x95d89b41 ^ 0xc87b56dd == 0x5b5e139f
     */
    bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;

    /**s
     * @dev Constructor function
     */
    constructor (string memory namee, string memory symboll) ERC721(namee,symboll){

    }

  
    /**
     * @dev Internal function to set the token URI for a given token.
     *
     * Reverts if the token ID does not exist.
     *
     * TIP: if all token IDs share a prefix (e.g. if your URIs look like
     * `http://api.myproject.com/token/<id>`), use {_setBaseURI} to store
     * it and save gas.
     */
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }

    /*
 
    struct metadata {
      string SBF;
      string EBF;
      uint   price;
      string Location;
    }
    */
    


    /**
     * @dev Internal function to set the token URI for a given token.
     *
     * Reverts if the token ID does not exist.
     *
     * TIP: if all token IDs share a prefix (e.g. if your URIs look like
     * `http://api.myproject.com/token/<id>`), use {_setBaseURI} to store
     * it and save gas.
     */
    function _setMetaData(uint256 tokenId,  string memory SBF, string memory EBF,
     uint price,string memory Location) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        metadata storage __metadata = _metadata[tokenId];
       __metadata.SBF = SBF;
       __metadata.EBF = EBF;
       __metadata.price = price;
       __metadata.Location = Location;
    }

     /**
     * @dev Internal function to set the token URI for a given token.
     *
     * Reverts if the token ID does not exist.
     *
     * TIP: if all token IDs share a prefix (e.g. if your URIs look like
     * `http://api.myproject.com/token/<id>`), use {_setBaseURI} to store
     * it and save gas.
     */
    function MetaData(uint256 tokenId) public view returns (string memory, string memory, uint, string memory) {
        require(_exists(tokenId), "ERC721Metadata: Metadata set of nonexistent token");
        return ( 
       _metadata[tokenId].SBF,
       _metadata[tokenId].EBF,
       _metadata[tokenId].price,
       _metadata[tokenId].Location);
    }

    function MetaDataToNFT(uint256 tokenId) public view returns (metadata memory) {
        require(_exists(tokenId), "ERC721Metadata: Metadata set of nonexistent token");
        return ( 
       _metadata[tokenId]);
    }

     function Start_BF(uint256 tokenId) public view returns (string memory) {
         require(_exists(tokenId), "ERC721Metadata: Metadata set of nonexistent token");
        return  _metadata[tokenId].SBF;
    }

    function End_BF(uint256 tokenId) public view returns (string memory) {
         require(_exists(tokenId), "ERC721Metadata: Metadata set of nonexistent token");
        return  _metadata[tokenId].EBF;
    }


     function Price_Of_Token(uint256 tokenId) public view returns (uint) {
         require(_exists(tokenId), "ERC721Metadata: Metadata set of nonexistent token");
        return  _metadata[tokenId].price;
    }

    function Location_Of_Token(uint256 tokenId) public view returns (string memory) {
         require(_exists(tokenId), "ERC721Metadata: Metadata set of nonexistent token");
        return  _metadata[tokenId].Location;
    }


    function chechifexist(uint256 tokenId) public view returns (bool) {
        if (_exists(tokenId)) return true;
        else return false;
    }
    

}