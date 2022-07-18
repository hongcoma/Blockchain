// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.4.0/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.4.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.4.0/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//import "https://github.com/nibbstack/erc721/blob/2.6.1/src/contracts/ownership/ownable.sol";


contract MyNFT is ERC721URIStorage,Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;//NFT id

    constructor() ERC721("MyNFT", "HJH") {}

    mapping(uint256 => Item) public tokenIdToItem;
    mapping(uint256 => uint256) public tranPrice;
    struct Item{
        address owner;
        address nowowner;
        uint price;
        string tokenURL;
        uint256 time;
    }

    uint itemcnt;

    //"https://ipfs.io/ipfs/QmYaz8LzQYAB52mPjjMKzXN7EhCp1j5xjKGfxDmKD17jJ6";
        //"https://ipfs.io/ipfs/QmfZ8sphhgNqJ82johpsiALyTQj2vu9fyPpZbWHHWHU128"

    function mint(address to) public returns(uint256) {
        //require(_tokenIds.current() < 3); //only 3 to mint
        _tokenIds.increment(); // add 1 by minting
        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId); // or _safeMint(to, newTokenId);
        itemcnt+=1;
        return newTokenId;
    }

    function mintWithURI(address to, string memory tokenURI) public returns(uint256) {
        _tokenIds.increment(); // add 1 by minting
        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId); // or _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI); // need to import ERC721URIStorage
        itemcnt+=1;
        return newTokenId;
  }

    function mintWithIdURI(uint256 _id, address to, string memory tokenURI) public returns(uint256){
        _tokenIds.increment(); // add 1 by minting
        uint256 newTokenId = _id;
        _mint(to, newTokenId); // or _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI); // need to import ERC721URIStorage
        itemcnt+=1;
        return newTokenId;
    }

    function myTransfer(address from, address to, uint256 _tokenId) public{

    }

    function setTokenIdToItem(uint256 _id, address _o, address _to, uint256 _p,string memory _uri, uint256 _t) public{
        Item memory i = Item(_o, _to, _p, _uri, _t);
        tokenIdToItem[_id]=i;
    }
    function getTokenIdToItem(uint256 tokenId) public view returns (address, address,uint256, string memory, uint256){
        Item memory i = tokenIdToItem[tokenId];
        return(i.owner, i.nowowner, i.price, i.tokenURL, i.time);
    }

    function getItemsLength() public view returns(uint){
        return itemcnt;
    }   

    function getOwner() view public returns(address) {
        return owner();  //function of the Ownerable contract
    }

    function getTokenURI(uint256 tokenId) public view virtual returns (string memory) {
        Item memory i = tokenIdToItem[tokenId];
        return i.tokenURL;
    }

    function getTotalSupply()public view returns(uint){
        uint256 newTokenId = _tokenIds.current();
        return newTokenId;
    }

}
