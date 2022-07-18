//SPDX-License-Identifier: MIT
pragma solidity ^0.4.25;
contract Hello{
    string toWhom="";
    function sayHello() pure public returns(string memory) {
        return "Hello, Smu";
    }
    
    function setWhom(string w){
        toWhom=w;
    } 
    
    function getWhom() view public returns(string toWhom){
        return toWhom;
    }
}
