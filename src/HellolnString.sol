//SPDX-License-Identifier: MIT
pragma solidity ^0.4.25;
contract HellolnString{
    string toWhom=" ";
    string Smu="Hello, Smu";
    function sayHello() view public returns(string memory) {
        return Smu;
    }
    
    function setWhom(string w) public{
        toWhom=w;
    } 
    
    function getWhom() view public returns(string w){
        return toWhom;
    }
}
