var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
var shelloContract = new web3.eth.Contract([{"inputs":[],"name":"sayHello","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}],
                                      "0x78f8218001E17060a7C47dB9A6E6BCC9EF3A2da0");
shelloContract.methods.sayHello().call().then(function(str) {console.log(str);});
