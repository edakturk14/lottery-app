//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

contract YourContract {
    address public manager;
    address payable[] public participants;
    address public winner;

	// Constructor: Called once on contract deployment
	// Check packages/hardhat/deploy/00_deploy_your_contract.ts
	constructor(address _owner) {
		manager = _owner;
	}

    function enter() public payable {
        require(msg.value >= 0.001 ether, "Entry requires exactly 0.001 Ether");
        participants.push(payable(msg.sender));
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants)));
    }

    function pickWinner() public {
        require(participants.length >= 3, "Not enough participants");

        uint index = random() % participants.length;
        winner = participants[index]; // Update the winner variable
        
        participants[index].transfer(address(this).balance);

        // Reset the state of the contract for the next lottery
        participants = new address payable[](0);
    }

    modifier restricted() {
        require(msg.sender == manager, "This function can only be called by the manager");
        _;
    }

    function getParticipants() public view returns (address payable[] memory) {
        return participants;
    }
}
