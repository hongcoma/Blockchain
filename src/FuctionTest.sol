//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract FunctionTest {
    int x;
    //constructor
    constructor() { //constructor() public {
        x = 0;
    }
    // updating state var x
    function incrementX() public {
        x += 1;
    }
    // call when x = 0
    function doubleX() public {
        X2();
    }
    // float not supported. try 0, 1/3...
    function divideBy(int by) view public returns(int) {
        return x/by;
    }
    // actually NONE returned
    function getX_() view public returns(int) {
        return x;        
    }
    // try pure
    function getX() view public returns(int) {
        return x;
    }
    function getBalance() view public returns(uint) {
        return(address(this).balance);
    }
    // 'payable' means that msg.value can be deposited
    function deposit() public payable {
    }
    // can not be used in public
    function X2() internal {
        x *= 2;
    }
    function getBlockNumber() view public returns(uint) {
        return block.number;
    }
}
