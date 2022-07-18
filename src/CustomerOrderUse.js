var Web3=require('web3');
var _abiBinJson = require('./CustomerOrder.json');      //importing a javascript file
var fs=require('fs');
var _str = fs.readFileSync("src/CustomerOrder.json");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
//var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8345"));
var _json=JSON.parse(_str)
contractName=Object.keys(_abiBinJson.contracts); // reading ['src/BankV3.sol:BankV3']
//console.log("- contract name: ", contractName); //or console.log(contractName[0]);
//_abiArray=_abiBinJson.contracts[contractName].abi; //use just as read from file
_abiArray=_json.contracts["src/CustomerOrder.sol:Order"].abi;
//_abiArray=JSON.parse(JSON.stringify(_abi));
//_abiArray=JSON.parse(_abi);      //JSON parsing needed!!
//_bin=_abiBinJson.contracts[contractName].bin;
//console.log("- ABI: " + _abiArray);
//console.log("- Bytecode: " + _bin);
var CsOr = new web3.eth.Contract(_abiArray,"0x0baaCB71b2329124996cFa31e61544d4d9aE6F8f");


async function doIt() {
    const accounts = await web3.eth.getAccounts();
    
    //계정 및 잔고 설정
    console.log("1. balance of accounts");
    console.log("account 1 balance :"+ await web3.eth.getBalance(accounts[1]));
    console.log("account 2 balance :"+ await web3.eth.getBalance(accounts[2]));
    console.log("account 3 balance :"+ await web3.eth.getBalance(accounts[3]));
    var b2 = await web3.eth.getBalance(accounts[2]);
    await web3.eth.getBlockNumber(function(err,num){
        if(!err) console.log("blocknumber is :"+num);
    });
    
    //고객정보 3건
    console.log("\n3. addCustomer");
    await CsOr.methods.addCustomer(111, "kim", "010-2017-1111", "111 hongji-dong jongro-gu seoul").send({from: accounts[1], gas: 1000000});
    await CsOr.methods.addCustomer(112, "lee", "010-2017-1112", "112 hongji-dong jongro-gu seoul").send({from: accounts[2], gas: 1000000});
    await CsOr.methods.addCustomer(113, "lim", "010-2017-1113", "113 hongji-dong jongro-gu seoul").send({from: accounts[3], gas: 1000000});
    
    //배송지 출력
    console.log("\n4. Show shipping address");
    var a1 = await CsOr.methods.getHomeAddress().call({from: accounts[1]});
    var a2 = await CsOr.methods.getHomeAddress().call({from: accounts[2]});
    var a3 = await CsOr.methods.getHomeAddress().call({from: accounts[3]});
    console.log(a1);
    console.log(a2);
    console.log(a3);

    //주문
    console.log("\n5. Order");
    await CsOr.methods.placeOrder(555, "T-Shirt", 2, 1115).send({from: accounts[1], gas: 1000000, value : 1115});
    await CsOr.methods.placeOrder(556, "T-Shirt", 3, 1116).send({from: accounts[2], gas: 1000000, value : 1116});
    await CsOr.methods.placeOrder(557, "T-Shirt", 4, 1117).send({from: accounts[3], gas: 1000000, value : 1117});
    
    //주문개수, 주문금액 합계 및 잔고 출력
    console.log("\n6. Ordercount, Orderamount And getBalance");
    var Norder = await CsOr.methods.getNOrder().call();
    var OrderAmount = await CsOr.methods.getTotalOrderAmount().call();
    var queryBalance = await CsOr.methods.queryBalance().call();
    console.log(Norder);
    console.log(OrderAmount);
    console.log(queryBalance);
    
    //모든 고객의 주문내역 출력
    console.log("\n7. All Customers Order Log");
    //var c1 = await CsOr.methods.getOrderById(555).call({from: accounts[1]});
    //var c2 = await CsOr.methods.getOrderById(556).call({from: accounts[2]});
    //var c3 = await CsOr.methods.getOrderById(557).call({from: accounts[3]});
    //console.log(c1);
    //console.log(c2);
    //console.log(c3);
    await CsOr.methods.getOrderItem().call({from: accounts[1]}).then(function(value) {console.log("OrderID :",value[0],"\nProductName :",value[1],"\nStatus :", value[2], "\nShiiping", value[3])});
    await CsOr.methods.getOrderItem().call({from: accounts[2]}).then(function(value) {console.log("\nOrderID :",value[0],"\nProductName :",value[1],"\nStatus :", value[2], "\nShiiping", value[3])});
    await CsOr.methods.getOrderItem().call({from: accounts[3]}).then(function(value) {console.log("\nOrderID :",value[0],"\nProductName :",value[1],"\nStatus :", value[2], "\nShiiping", value[3])});
    
    //주문 ID 556으로 주문내역 출력
    console.log("\n8. OrderID 556");
    await CsOr.methods.getOrderById(556).call({from: accounts[2]}).then(function(value) {console.log("OrderID :",value[0],"\nProductName :",value[1],"\nStatus :", value[2], "\nShiiping", value[3])});

    //주문 ID 556으로 환불처리
    console.log("\n9. Refund OrderID 556");
    await CsOr.methods.refund(556).send({from: accounts[2], gas: 1000000});
    
    var b2_after = await CsOr.methods.checkbalance().call({from: accounts[2]});
    var b2_after2 = await web3.eth.getBalance(accounts[2]);
    console.log("before account 2 balance :"+b2);
    console.log("after account 2 balance :"+b2_after);
    console.log("after2 account 2 balance :"+b2_after2);
    
    //주문 ID 556으로 환불처리 된 주문내역 출력
    console.log("\n10. OrderID 556");
    await CsOr.methods.getOrderById(556).call({from: accounts[2]}).then(function(value) {console.log("OrderID :",value[0],"\nProductName :",value[1],"\nStatus :", value[2], "\nShiiping", value[3])});
    var Norder_n = await CsOr.methods.getNOrder().call();
    var OrderAmount_n = await CsOr.methods.getTotalOrderAmount().call();
    var queryBalance_n = await CsOr.methods.queryBalance().call();
    console.log(Norder_n);
    console.log(OrderAmount_n);
    console.log(queryBalance_n);
}
doIt()
