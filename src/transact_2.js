var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

async function transact() {
    nb1=await web3.eth.getBalance("0x1785dcD3F897d13743134C521779182335f4Eb86");
    nb2=await web3.eth.getBalance("0x85029c4088106a959727efdf3102d511bdcb4722");
    console.log('new sender balance in ether: ',nb1);
    console.log('new receiver balance in ether: ',nb2);
}
transact()
