var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');
async function coinbase() {
    accounts = await web3.eth.getAccounts();
    account0=accounts[0];
    cb=await web3.eth.getBalance(account0);
    console.log('coinbase balance:',web3.utils.fromWei(cb,"ether"));
}
coinbase();
