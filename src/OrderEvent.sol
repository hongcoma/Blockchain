//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract OrderEvent {
    address private owner;
    event OrderLog(address indexed _from, bytes2 _itemId, uint indexed _value,uint indexed _unitPrice, string _shipping);
    
    constructor(){
        owner = msg.sender;
    }
    
    function order(bytes2 _itemId, uint quantity, uint unitPrice, string memory where) public payable {
        uint256 orderAmount = quantity * unitPrice;
        string memory _shipping = where;
        require(msg.value == orderAmount);
        emit OrderLog(msg.sender, _itemId, quantity, unitPrice, _shipping);
    }

    function getBalance()view public isOwner returns(uint){
        return address(this).balance;
    }
    modifier isOwner(){
        if(msg.sender == owner){
            revert();
        }
        _;
    }
}
