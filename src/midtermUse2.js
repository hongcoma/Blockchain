var Web3=require('web3');
var _abiBinJson = require('./midterm.json');      //importing a javascript file

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts); 
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
_abi=_abiBinJson.contracts[contractName].abi;
//_abiArray=JSON.parse(JSON.stringify(_abi));
_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
//_bin=_abiBinJson.contracts[contractName].bin;
//console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);

var even = new web3.eth.Contract(_abiArray,"0x96499E99E0Bf2444f6A9b998B01f645371AA0c9e");

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    await even.methods.add().send({from:accounts[0],gas:100000});
    even.methods.getCounter().call().then(function(str) {console.log("counter -->: "+str);});
    even.methods.getTimeCalled().call().then(function(str) {console.log("time -->: "+str);});
}

doIt()
