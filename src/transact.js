miner.setEtherbase(eth.accounts[0]);
var bal1=eth.getBalance(eth.coinbase);
var bal2=eth.getBalance(eth.accounts[1]);
console.log('sender balance in ether: ', web3.fromWei(bal1,"ether"));
console.log('receiver balance in ether: ', web3.fromWei(bal2,"ether"));
console.log('- before blocknum: ',eth.blockNumber)
var h=eth.sendTransaction({from:eth.coinbase, to:eth.accounts[1],value:10000});
miner.start(1);admin.sleepBlocks(1);miner.stop();
var bal1new=eth.getBalance(eth.coinbase);
var bal2new=eth.getBalance(eth.accounts[1]);
console.log('- New sender balance in ether: ', web3.fromWei(bal1new,"ether"));
console.log('- New receiver balance in ether: ', web3.fromWei(bal2new,"ether"));
console.log('- after blocknum: ',eth.blockNumber)
console.log('- Used Gas:', eth.getTransactionReceipt(h).gasUsed);
console.log('- REceipt:', JSON.stringify(eth.getTransactionReceipt(h)));
