var Web3=require('web3');
var _abiBinJson = require('./RSP.json');      //importing a javascript file

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
//var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8345"));

contractName=Object.keys(_abiBinJson.contracts); // reading ['src/BankV3.sol:BankV3']
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
_abiArray=_abiBinJson.contracts[contractName].abi; //use just as read from file
//_abiArray=JSON.parse(JSON.stringify(_abi));
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
//_bin=_abiBinJson.contracts[contractName].bin;
//console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);
var RSP = new web3.eth.Contract(_abiArray,"0xcD27BD14E2D87037Cf41928C888BcD95f9E75c1a");


async function doIt() {
    const accounts = await web3.eth.getAccounts();
    
    //초기 주소 설정
    await RSP.methods.initAddress(accounts[1]).send({from: accounts[0], gas: 2590210});
    
    //player 계좌 충전 (10000wei씩)
    await RSP.methods.deposit(10000).send({from: accounts[0], gas: 2590210, value : 10000});
    
    //잔액 출력
    console.log("\nbefore Start Game --> BalanceOf A, BalanceOf B, BalanceOf Contract");
    RSP.methods.getBalance().call().then(console.log);
    
    //A 설정
    await RSP.methods.setA().send({from: accounts[0], gas: 2590210});
    
    //B 설정
    await RSP.methods.setB(1000,1).send({from: accounts[0], gas: 2590210});
    
    //play
    await RSP.methods.play().send({from: accounts[0], gas: 2590210});
    
    //결과 출력
    console.log("\nShow Result Game --> Who is Winner?");
    RSP.methods.getMatchResult().call().then(console.log);
    
    //배팅금액 전송
    await RSP.methods.distributeBetAmount().send({from: accounts[0], gas: 2590210});
    
    //잔액 출력
    console.log("\nAfter Start Game --> BalanceOf A, BalanceOf B, BalanceOf Contract");
    RSP.methods.getBalance().call().then(console.log);
    
}
doIt()
