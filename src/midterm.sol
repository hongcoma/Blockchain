pragma solidity ^0.4.25;
contract Counter {
    uint256 counter = 0;
    function add() public {
        counter++;
    }
    function subtract() public {
        counter--;
    }
    function getCounter() public view returns (uint256) {
        return counter;
    }
    uint256 startTime;
    function setTimeCalled() internal {
        startTime=now;
    }
    function getTimeCalled() public view returns(uint256) {
        return now-startTime;
    }
}
