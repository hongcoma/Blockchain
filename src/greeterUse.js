var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
var _abiArray=[{"constant":false,"inputs":[{"name":"_greeting","type":"string"}],"name":"setGreeting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"greet","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var greeter = new web3.eth.Contract(_abiArray,"0x479b7267103F891871325Ffb6a56E1Cc3bCB2599");
greeter.methods.greet().call().then(function(value) {console.log(value);});
greeter.methods.setGreeting("Hello SMU123").send({from:"0xAA24B7b946Dd6be2764aD9E6A3EceF2709556ADb",gas:100000});
greeter.methods.greet().call().then(function(value) {console.log(value);});
