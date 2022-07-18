var Web3 = require('web3');
var web3 = new Web3('http://localhost:8345');
var account0;
async function midterm1() {
    accounts = await web3.eth.getAccounts();
    account0=accounts[0];
    account1=accounts[1];
    bal0= await web3.eth.getBalance(account0);
    bal1= await web3.eth.getBalance(account1);
    console.log("(1) ac0: " + account0+"  ac1: "+account1+"\n");
    console.log("(2) bal Of ac0: " + bal0+"  ac1: "+bal1+"\n");
    h= await web3.eth.sendTransaction({from:account0, to:account1,value:1111});
    console.log("(3) callback - sending ac0 -> ac1 \n")
    console.log("(4) transactionHash: "+JSON.stringify(h.transactionHash)+"\n");
    console.log("(5) gas costs: "+2000000000*h.gasUsed+"\n");
    nonce= await web3.eth.getTransactionCount(account0);
    console.log("(6) nonce: "+nonce+"\n");
    new_bal0= await web3.eth.getBalance(account0);
    new_bal1= await web3.eth.getBalance(account1);
    console.log("(7) bal diff1: " + (web3.utils.fromWei(new_bal0)-web3.utils.fromWei(bal0))+"  bal diff2: "+(web3.utils.fromWei(new_bal1)-web3.utils.fromWei(bal1))+"\n");
    console.log("(8) adding balance\n");
    SumOfBalance=parseInt(0);
    for (i=0; i<10; i++){
        bal=await web3.eth.getBalance(accounts[i]);
        num=parseInt(bal);
        console.log("sum: "+SumOfBalance+"       adding "+i+"  "+bal+"\n");
        SumOfBalance=parseInt(SumOfBalance+bal);
    }
    console.log("\n(9) balance total: "+SumOfBalance);

}
midterm1()
