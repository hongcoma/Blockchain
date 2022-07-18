var Web3=require('web3');
var _abiBinJson = require('./CountTimer.json');      //importing a javascript file

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
contractName=Object.keys(_abiBinJson.contracts); // reading ['src/Counter.sol:Counter']
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
_abi=_abiBinJson.contracts[contractName].abi;
_abiArray=JSON.parse(JSON.stringify(_abi));
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
//_bin=_abiBinJson.contracts[contractName].bin;
//console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);

var counttimer = new web3.eth.Contract(_abiArray,"0x8C2B650D4FB597d263F6e46D54600a9755129d60");

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Call from: " + accounts[0]);
    counttimer.methods.getNow().call().then(function(value) {console.log("Now: "+ value);});
    await counttimer.methods.start().send({from:accounts[0],gas:100000});
    counttimer.methods.getCounter().call().then(function(str) {console.log("first : "+str);});
    await counttimer.methods.add().send({from:accounts[0],gas:100000});
    await counttimer.methods.add().send({from:accounts[0],gas:100000});
    await counttimer.methods.add().send({from:accounts[0],gas:100000});
    counttimer.methods.getCounter().call().then(function(str) {console.log("second : "+str);});
    counttimer.methods.timePassed().call().then(function(value) {console.log("Passed: "+ value);});
    
    
    //const accounts = await web3.eth.getAccounts();
    //var start =await counttimer.methods.getNow().call();
    //console.log("start: "+start);
    //counttimer.methods.getCounter().call().then(function(str) {console.log("first : "+str);});
    //await counttimer.methods.add().send({from:accounts[0],gas:100000});
    //await counttimer.methods.add().send({from:accounts[0],gas:100000});
    //await counttimer.methods.add().send({from:accounts[0],gas:100000});
    //counttimer.methods.getCounter().call().then(function(str) {console.log("second : "+str);});
    //var stop=await counttimer.methods.getNow().call();
    //console.log("stop: "+stop);
    //var time=await stop-start;
    //await 40000000000000000000000;
    //console.log("used time "+time);
}

doIt()
