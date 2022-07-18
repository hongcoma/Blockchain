var Web3=require('web3');
var _abiBinJson = require('./Multiply7.json');      //importing a javascript file

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts); // reading ['src/Multiply7.sol:Multiply7']
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
_abi=_abiBinJson.contracts[contractName].abi;
_abiArray=JSON.parse(JSON.stringify(_abi));
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
//_bin=_abiBinJson.contracts[contractName].bin;
//console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);

var M7 = new web3.eth.Contract(_abiArray,"0xF37Dd7FE1e99e9Ce14bABFc5303638382AAfA52e");
M7.methods.multiply(7).call().then(function(str) {console.log(str);});
