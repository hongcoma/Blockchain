//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract StudentsCrud {
    uint[] num;
    string[] stdname;
    bool[] ee;

    function insert(uint n, string memory sn, bool e) public {
        num.push(n);
        stdname.push(sn);
        ee.push(e);
    }
    /* @param d  ok to pass an integer (uint8)*/
    function getFirstStudent() public view returns(uint, string memory, bool){
        return (num[0], stdname[0], ee[0]);
    }
    //uint is converted to uint8, which is default
    function findBy(uint8 index) view public returns(uint, string memory, bool){
        return (num[index], stdname[index], ee[index]);
    }
    function remove(uint index) public{
        for(uint i=index; i<num.length-1; i++){
          num[i] = num[i+1];
          stdname[i] = stdname[i+1];
          ee[i] = ee[i+1];
      }
      num.pop();
      stdname.pop();
      ee.pop();
    }
    function getLength() view public returns(uint){
        return num.length;
    }
    function pop() public{
        num.pop();
        stdname.pop();
        ee.pop();
    }
}
