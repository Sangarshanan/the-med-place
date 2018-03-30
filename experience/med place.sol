pragma solidity ^0.4.18;

contract Medplace {
    
   uint total;

   function setInstructor(uint _total) public {
       total = _total;
   }
   
   function getInstructor() view public returns (uint) {
       return (total);
   }
   
}