var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');

async function EthToWon() {
    wei = await web3.eth.getBalance("0x1785dcD3F897d13743134C521779182335f4Eb86");
    var won = 4064000
    var e = web3.utils.fromWei(wei,"ether")
    var result = e*won
    console.log("price:" + result+" won");
}
EthToWon();
