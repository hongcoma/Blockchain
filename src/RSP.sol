//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

contract RSP {
    address addA;
    address addB;
    address private owner;
    uint balanceOfA=0;
    uint balanceOfB=0;
    int result=-1;

    struct playRSP{
        string player;
        uint batting;
        uint whatRSP;
    }

    playRSP playerA;
    playRSP playerB;

    constructor(){
        owner = msg.sender;
    }

    mapping (address => uint) balanceOf;

    function initAddress(address receiver) public{
        addA = address(this);
        addB = receiver;
    }

    function deposit(uint amount) payable public onlyOwner { 
        require(msg.value == amount);
        balanceOf[addA]+=amount;
        balanceOf[addB]+=amount;
    }

    function setA() public{
        uint autoRSP = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%3);
        playerA= playRSP("player A", 1000,autoRSP);
    }

    function setB(uint BattingMoney, uint _humanRSP) public{
        playerB= playRSP("player B", BattingMoney, _humanRSP);
    }

    function play() public {
        uint RSP_A = playerA.whatRSP;
        uint RSP_B = playerB.whatRSP;

        //가위:0 바위:1 보:2
        //tie
        if(RSP_A==RSP_B){
            result=0;
        }
        //Awin
        else if((RSP_A==0 && RSP_B ==2)||(RSP_A==1 && RSP_B==0)||(RSP_A ==2 && RSP_B==1)){
            result=1;
        }
        //Bwin
        else{
            result=2;
        }
    }

    function distributeBetAmount() public {
        
        uint A_batting = playerA.batting;
        uint B_batting = playerB.batting;
        if (result==1){ //Awin
            balanceOf[addA]+=B_batting;
            balanceOf[addB]-=B_batting;
        }

        else if (result==2){ //Bwin
            balanceOf[addA]-=A_batting;
            balanceOf[addB]+=A_batting;
        }
        
    }

    function getMatchResult() public view returns (string memory){
        if(result==0){
            return("tie");
        }
        else if(result==1){
            return("A wins");
        }
        else{
            return("B wins");
        }
    }

    function getBalance() public view returns(uint, uint, uint) {
        return ( balanceOf[addA], balanceOf[addB], balanceOf[address(this)]);
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

}
