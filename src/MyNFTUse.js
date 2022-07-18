var Web3=require('web3');
var _abiBinJson = require('./MyNFT.json');      //importing a javascript file

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
//var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts);
console.log("- contract name: ", contractName[12]);
_abiArray=_abiBinJson.contracts[contractName[12]].abi;
//_abiArray=JSON.parse(JSON.stringify(_abi));
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!! //SyntaxError: Unexpected token o in JSON at position 1
_bin="0x"+_abiBinJson.contracts[contractName[12]].bin;
var _nft = new web3.eth.Contract(_abiArray,"0x9B41411DBD300D46CB574cE61fA05f1F8a7d8804");

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    var imgA = "https://ipfs.io/ipfs/QmYaz8LzQYAB52mPjjMKzXN7EhCp1j5xjKGfxDmKD17jJ6";
    var imgB = "https://ipfs.io/ipfs/QmfZ8sphhgNqJ82johpsiALyTQj2vu9fyPpZbWHHWHU128";
   
    
    console.log("\n(8) solution");
    await _nft.methods.mintWithURI(accounts[0],imgA).send({from: accounts[1], gas: 1000000});
    console.log("mining from"+accounts[0]+" to "+accounts[1]);
    
    console.log("\n(9) solution");
    await _nft.methods.mintWithURI(accounts[0],imgB).send({from: accounts[2], gas: 1000000});
    console.log("mining from"+accounts[0]+" to "+accounts[2]);
    
    console.log("\n(10) solution");
    await _nft.methods.getItemsLength().call({from: accounts[0]}).then(function(value) {console.log("Item Count :",value[0])});
    
    console.log("\n(11) solution");
    console.log("account 0 balance :"+ await web3.eth.getBalance(accounts[0]));
    console.log("account 1 balance :"+ await web3.eth.getBalance(accounts[1]));
    console.log("account 2 balance :"+ await web3.eth.getBalance(accounts[2]));
    
    console.log("\n(12) solution");
    await _nft.methods.tokenURI(1).call({from: accounts[0]}).then(function(value) {console.log("tokenURI of tokenId 1 :",value)});

    console.log("\n(13) solution");
    await _nft.methods.getTokenIdToItem(1).call({from: accounts[1]}).then(function(value) {console.log("getTokenIdToItem(tokenId=1) :",value)});
    
    console.log("\n(14) solution");
    //await _nft.methods.transferFrom(accounts[1],accounts[2],1).send({from: accounts[1], gas: 10000000});
    
    console.log("\n(15) no solution");
    console.log("\n(16) no solution");
    console.log("\n(17) no solution");
    console.log("\n(18) no solution");
    console.log("\n(19) no solution");
    
}
doIt()
