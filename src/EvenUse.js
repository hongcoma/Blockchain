var Web3=require('web3');
var _abiBinJson = require('./Even.json');      //importing a javascript file

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts); 
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
_abi=_abiBinJson.contracts[contractName].abi;
_abiArray=JSON.parse(JSON.stringify(_abi));
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
//_bin=_abiBinJson.contracts[contractName].bin;
//console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);

var even = new web3.eth.Contract(_abiArray,"0xA2571152cD1A08536AC31f91afED9709D57423d1");

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Call from: " + accounts[0]);
    even.methods.getCounter().call().then(function(str) {console.log("1 -->: "+str);});
    await even.methods.add().send({from:accounts[0],gas:100000});
    even.methods.getCounter().call().then(function(str) {console.log("2 -->: "+str);});
    await even.methods.add().send({from:accounts[0],gas:100000});
    even.methods.getCounter().call().then(function(str) {console.log("3 -->: "+str);});
    await even.methods.add().send({from:accounts[0],gas:100000});
    even.methods.getCounter().call().then(function(str) {console.log("4 -->: "+str);});
    await even.methods.add().send({from:accounts[0],gas:100000});
    even.methods.getCounter().call().then(function(str) {console.log("5 -->: "+str);});
    await even.methods.isEven().call().then(function(str) {console.log("isEven?? -->: "+str);});
}

doIt()
