//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0; //^0.5.0;

contract Q11 {
    address owner;
    uint balance;
    event PrintLog (address from, uint amount);
    constructor() { //constructor() public {
        owner = msg.sender;
        balance = 0;
    }
    fallback() external payable{ // v0.5.0 function() external {
        balance += msg.value;
        emit PrintLog(msg.sender, msg.value);
    }
    receive() external payable{
        
    }
    function forwardTo(address payable _receiver) public payable onlyOwner {
        _receiver.transfer(msg.value);
    }
    function getBalance() public view returns(uint, uint) {
        return (balance, address(this).balance);
    }
    function deposit(uint amount) public payable  {
        require(msg.value == amount);
        balance += amount;
    }
    function withdrawAll() public onlyOwner minBalance {
        balance -= address(this).balance;
        payable(msg.sender).transfer(address(this).balance); 
    }
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    modifier minBalance {
        require(address(this).balance>101 wei);
        _;
    }
}
