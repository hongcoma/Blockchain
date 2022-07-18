var Web3=require('web3');
var _abiBinJson = require('./Timer.json');      //importing a javascript file

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts); // reading ['src/Timer.sol:Timer']
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
_abi=_abiBinJson.contracts[contractName].abi;
//_abiArray=JSON.parse(JSON.stringify(_abi));
_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
//_bin=_abiBinJson.contracts[contractName].bin;
//console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);

var timer = new web3.eth.Contract(_abiArray,"0x0967A83CfCa445aa4852bf8e14db4c950e8EaB37");

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Call from: " + accounts[0]);
    timer.methods.getNow().call().then(function(value) {console.log("Now: ", value);});
    await timer.methods.start().send({from:accounts[0],gas:100000});
    //await 4000;
    timer.methods.timePassed().call().then(function(value) {console.log("Passed: ", value);});
}

doIt()
