var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

async function transact() {
    b1=await web3.eth.getBalance("0x1785dcD3F897d13743134C521779182335f4Eb86");
    b2=await web3.eth.getBalance("0x85029c4088106a959727efdf3102d511bdcb4722");
    console.log('sender balance in ether: ',web3.utils.fromWei(b1,"ether"));
    console.log('receiver balance in ether: ',web3.utils.fromWei(b2,"ether"));
    h = await web3.eth.sendTransaction({from:"0x1785dcD3F897d13743134C521779182335f4Eb86", to:"0x85029c4088106a959727efdf3102d511bdcb4722",value:1000000000000000000});
    nb1=await web3.eth.getBalance("0x1785dcD3F897d13743134C521779182335f4Eb86");
    nb2=await web3.eth.getBalance("0x85029c4088106a959727efdf3102d511bdcb4722");
    console.log('new sender balance in ether: ',web3.utils.fromWei(nb1,"ether"));
    console.log('new receiver balance in ether: ',web3.utils.fromWei(nb2,"ether"));
}
transact()

