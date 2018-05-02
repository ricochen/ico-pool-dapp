pragma solidity ^0.4.22;


/**
 * @title Ownable
 * @dev The Ownable contract has an owner address and provides basic authorization control functions that simplify user permissions
 */
contract Ownable {
    address public owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Ownable constructor sets owner equal to msg.sender
     */
    constructor() public {
        owner = msg.sender;
    }

    /**
     * @dev Throws if called by an account other than owner
     */
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner
     * @param newOwner The address to transfer ownership to
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        owner = newOwner;
        emit OwnershipTransferred(msg.sender, newOwner);
    }
}