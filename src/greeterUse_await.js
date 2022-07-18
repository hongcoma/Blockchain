var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
var _abiArray=[{"constant":false,"inputs":[{"name":"_greeting","type":"string"}],"name":"setGreeting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"greet","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var greeter = new web3.eth.Contract(_abiArray,"0x5D3598c5b33bdc2B3C4c02b64e5589C3704Fc366");
greeter.methods.greet().call().then(function(value) {console.log(value);});
await greeter.methods.setGreeting("Hello SMU12353425342532453425").send({from:"0xb09Bb72fD00c2895460b0c5aa4f4D0B80d9F1756",gas:100000});
greeter.methods.greet().call().then(function(value) {console.log(value);});
