// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FoodTraceability is Ownable {
    uint public totalVoters;
    uint public proposedPercentage;
    bool public priceUpdated; // To ensure price is updated only once

    struct UserDetails {
        string supplierName;
        string foodName;
        uint productSerialNo;
        uint sellingPrice;
    }

    address[] public voterAddresses;

    mapping(address => UserDetails) public accountAddress;
    mapping(address => bool) public hasVoted;

    function registerAsStakeholder() public {
        require(!isVoter(msg.sender), "You are already registered");
        voterAddresses.push(msg.sender);
        totalVoters++;
        hasVoted[msg.sender] = false;
    }

    function isVoter(address _address) internal view returns (bool) {
        for (uint i = 0; i < voterAddresses.length; i++) {
            if (voterAddresses[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function setSellerInfo(
        string memory _supplierName,
        string memory _foodName,
        uint _productSerialNo,
        uint _sellingPrice
    ) public {
        accountAddress[msg.sender] = UserDetails(
            _supplierName,
            _foodName,
            _productSerialNo,
            _sellingPrice
        );
    }

    uint public yesCount;
    uint public noCount;

    function proposePriceUpdate(uint _percentage) public onlyOwner {
        proposedPercentage = _percentage;
        yesCount = 0;
        noCount = 0;
        priceUpdated = false; // Reset the flag for the new proposal
        for (uint i = 0; i < voterAddresses.length; i++) {
            hasVoted[voterAddresses[i]] = false;
        }
    }

    function vote(bool isYes) public {
        require(isVoter(msg.sender), "You are not registered as a stakeholder");
        require(!hasVoted[msg.sender], "You have already voted");

        hasVoted[msg.sender] = true;

        if (isYes) {
            yesCount++;
        } else {
            noCount++;
        }

        // Calculate the voting percentage
        uint votePercentage = getVotePercentage();

        // Check if voting percentage is greater than 50 and price hasn't been updated yet
        if (votePercentage > 50 && !priceUpdated) {
            updateSellingPrice();
            priceUpdated = true; // Ensure the price is updated only once
        }
    }

    // function updateSellingPrice() internal {
    //     for (uint i = 0; i < voterAddresses.length; i++) {
    //         address voter = voterAddresses[i];
    //         UserDetails storage user = accountAddress[voter];
    //         uint oldPrice = user.sellingPrice;
    //         uint percentageIncrease = (oldPrice * proposedPercentage) / 100;
    //         user.sellingPrice = oldPrice + percentageIncrease;
    //         // Update the user's info with the new price
    //         setSellerInfo(user.supplierName, user.foodName, user.productSerialNo, user.sellingPrice);
    //     }
    // }

    function updateSellingPrice() internal {
        for (uint i = 0; i < voterAddresses.length; i++) {
            address voter = voterAddresses[i];
            UserDetails storage user = accountAddress[voter];
            uint oldPrice = user.sellingPrice;
            uint percentageIncrease = (oldPrice * proposedPercentage) / 100;
            user.sellingPrice = oldPrice + percentageIncrease;
        }
    }

    function getVotePercentage() public view returns (uint) {
        if (totalVoters == 0) {
            return 0;
        }
        uint percentage = (yesCount * 100) / totalVoters;
        return percentage;
    }
}
