//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract Customer {
    struct User{
        uint ID;
        string Name;
        string Phnum;
        string shipping;
        bool isCtm;
    }

    mapping (address => User) UserMap;
    mapping (uint => address) addressById;
    mapping (address => uint) mileage;
    //
    mapping (address => uint) balanceOf;

    function addCustomer(uint _id, string memory _name, string memory _ph, string memory _home) public{
        User memory u = User(_id, _name, _ph, _home, true);
        UserMap[tx.origin]=u;
        //
        balanceOf[tx.origin]=tx.origin.balance;
    }
    
    function getMileage() public view returns(uint){
        return mileage[tx.origin];
    }

    function getHomeAddress() public view returns(string memory){
        User memory u = UserMap[tx.origin];
        return u.shipping;
    }

    function getId() public view returns(uint){
        User memory u = UserMap[tx.origin];
        return u.ID;
    }

    function isCustomer() public view returns(bool){
        User memory u = UserMap[tx.origin];
        return u.isCtm;
    }

    function addMileage(uint num) public{
        mileage[tx.origin]+=num;
    }

    function refundMileage(uint num) public{
        mileage[tx.origin]-=num;
    }

    function checkbalance() public view returns(uint){
        return balanceOf[tx.origin];
    }

    function plusbalance(address a, uint num) public payable{ //refund
        balanceOf[a]+=num;
        balanceOf[address(this)]-=num;
    }

    function minusbalance(address a, uint num) public payable{ //buy
        balanceOf[a]-=num;
        balanceOf[address(this)]+=num;
    }
}

contract Order {
    struct OrderInfo{
        uint OrderID;
        string ProductName;
        uint ProductCnt;
        uint256 time;
        string shipping;
        bool isOrdered;
    }
    uint ordercnt=0;
    uint orderallamount=0;
    Customer c;
    constructor() {
        c = new Customer();
    }

    mapping (uint => address) bidirectional_map;
    mapping (address => Customer) CustomerByAddr;
    mapping (address => OrderInfo) OrderInfoByAddr; 
    mapping (address => string) statusMap;
    mapping (address => uint) ProductAmountMap;
    mapping (address => uint) balanceOf;

    function placeOrder (uint _id, string memory _p, uint _n, uint _amount) public payable{   
        OrderInfo memory o = OrderInfo (_id, _p, _n, block.timestamp, c.getHomeAddress(), true);
        OrderInfoByAddr[tx.origin]=o;
        statusMap[tx.origin]="Ordered";
        bidirectional_map[_id]=tx.origin;
        ProductAmountMap[tx.origin]=_amount;

        balanceOf[tx.origin]+=_amount;
        minusbalance(bidirectional_map[_id], _amount);
        ordercnt+=1;
        orderallamount+=_amount;
        c.addMileage(_amount/100);
    }

    function addMileage(uint num) public {
        c.addMileage(num);
    }

    function refundMileage(uint num) public {
        c.refundMileage(num);
    }

    function plusbalance(address a, uint num) public payable{
        c.plusbalance(a,num);
    }

    function minusbalance(address a, uint num) public payable{
        c.minusbalance(a,num);
    }

    function addCustomer(uint _id, string memory _name, string memory _ph, string memory _home) public{
        c.addCustomer(_id, _name, _ph, _home);
    }

    function getHomeAddress() public view returns(string memory){//배송지주소조회
        return c.getHomeAddress();
    }

    function getStatus() public view returns(string memory){//주문처리상황조회
        return statusMap[tx.origin];
    }

    function updateStatus(uint _id, string memory _s) public{//주문처리상황갱신
        statusMap[bidirectional_map[_id]]=_s;
    }

    function refund(uint _id) public{//주문ID로 환불
        statusMap[bidirectional_map[_id]]="refunded";
        refundMileage(ProductAmountMap[bidirectional_map[_id]]/100);
        plusbalance(bidirectional_map[_id],ProductAmountMap[bidirectional_map[_id]]);
        payable(bidirectional_map[_id]).transfer(ProductAmountMap[bidirectional_map[_id]]);
        orderallamount-=ProductAmountMap[bidirectional_map[_id]];
        ordercnt-=1;
        balanceOf[payable(bidirectional_map[_id])]-=ProductAmountMap[bidirectional_map[_id]];
        ProductAmountMap[bidirectional_map[_id]]=0;
    }

    function getOrderItem() public view returns(uint, string memory, string memory , string memory){//주문내역출력
        //주문했던 고객의 계정에 해당하는 주문ID, 상품명, 상태, 배송지 출력
        OrderInfo memory o = OrderInfoByAddr[tx.origin];
        return (o.OrderID, o.ProductName, statusMap[tx.origin], o.shipping);
    }

    function getOrderById(uint _id) public view returns(uint, string memory, string memory , string memory){//주문ID로 주문내역 조회
        //주문ID를 입력하면 주문ID, 상품명, 상태, 배송지 출력
        OrderInfo memory o = OrderInfoByAddr[bidirectional_map[_id]];
        return (o.OrderID, o.ProductName, statusMap[tx.origin], o.shipping);
    }

    function getNOrder() public view returns(uint){//주문갯수조회함수
        return ordercnt;
    }

    function getTotalOrderAmount() public view returns(uint){//주문 총액 조회 함수
        return orderallamount;
    }

    function queryBalance() public view returns(uint){//컨트랙 잔고 확인 함수
        return address(this).balance;
    }

    //
    function checkbalance() public view returns(uint){
        return c.checkbalance();
    }
}
