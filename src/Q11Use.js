var Web3=require('web3');
var _abiBinJson = require('./Q11.json');      //importing a javascript file

//var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8345"));

contractName=Object.keys(_abiBinJson.contracts); // reading ['src/BankV3.sol:BankV3']
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
_abiArray=_abiBinJson.contracts[contractName].abi; //use just as read from file
//_abiArray=JSON.parse(JSON.stringify(_abi));
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
//_bin=_abiBinJson.contracts[contractName].bin;
console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);
var Q11 = new web3.eth.Contract(_abiArray,"0xC899B43F09d9Cb5985C7677FcD62FFe68F129838");
var event = Q11.events.PrintLog(function (error, result) {
  if (!error)
    console.log("Event fired: "+ JSON.stringify(result.returnValues));
});
//console.log(bank.sendTo(0x778ea91cb0d0879c22ca20c5aea6fbf8cbeed480, 100,{from:web3.eth.accounts[0],gas:100000}));

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    const B1_Before = await web3.eth.getBalance(accounts[0]);
    const B2_Before = await web3.eth.getBalance(accounts[1]);

    console.log("\n1.Deposit 11111wei, 222wei and Output contract balance 11333wei");
    await Q11.methods.getBalance().call().then(console.log);
    await Q11.methods.deposit(11111).send({from: accounts[0], value:11111});
    await Q11.methods.getBalance().call().then(console.log);
    await Q11.methods.deposit(222).send({from: accounts[0], value:222});
    await Q11.methods.getBalance().call().then(console.log);
    
    console.log("\n2.Transfer 333wei to my 2nd account and Output contract balance, increment 2nd account");
    await Q11.methods.forwardTo(accounts[1]).send({from: accounts[0], value:333});
    await Q11.methods.getBalance().call().then(console.log);
    const B2_After = await web3.eth.getBalance(accounts[1]);
    console.log("Balance2 Before: " + B2_Before);
    console.log("Balance2 After: " + B2_After);
    console.log("B2: " + (B2_After-B2_Before));

    console.log("\n3.WithdrawAll and Output 11000wei, increment of my balance");
    await Q11.methods.withdrawAll().send({from: accounts[0]});
    const B1_After = await web3.eth.getBalance(accounts[0]);
    await Q11.methods.getBalance().call().then(console.log);
    console.log("Balance1 Before: " + B1_Before);
    console.log("Balance1 After: " + B1_After);
    console.log("B1: " + (B1_After-B1_Before));
    
    console.log("\n4.Send 111 to contract and deposit with fallback, not deposit(), Output contract balance 111wei");
    await web3.eth.sendTransaction({from:accounts[0], to: "0xC899B43F09d9Cb5985C7677FcD62FFe68F129838",data: "0x1111",value:111});
    await Q11.methods.getBalance().call().then(console.log);
    process.exit(1);
}
doIt()
