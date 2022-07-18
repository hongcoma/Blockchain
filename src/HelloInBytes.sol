//SPDX-License-Identifier: MIT
pragma solidity ^0.4.25;
contract HelloInBytes{
    bytes toWhom="";
    bytes smu="Hello, Smu";
    function sayHello() view public returns(bytes memory) {
        return smu;
    }
    
    function setWhom(bytes w) public{
        toWhom=w;
    } 
    
    function getWhom() view public returns(bytes w){
        return toWhom;
    }
}
