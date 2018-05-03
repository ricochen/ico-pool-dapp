pragma solidity ^0.4.22;

import "./SafeMath.sol";
import "./Ownable.sol";


contract ERC20 {
    function balanceOf(address _owner) public view returns (uint balance);
    function transfer(address _to, uint _value) public returns (bool success);
}

/**
 * @title ICOPool
 * @dev Contract that pools together contributions to send to an ICO contract
 * @dev Owner of contract determines when to send to ICO after poolSoftCap has been reached through buyTokensFromICO
 */
contract ICOPool is Ownable {
    using SafeMath for uint256;

    // The ICO this pool will transfer the eth to in order to buy tokens
    address public targetICO;

    // The balance in wei the pool currently manages
    uint256 public poolBalance;

    // The minimum wei a contributor has to send to participate in the pool
    uint256 public minContribution;

    // The maximum wei a contributor can send to participate in the pool
    uint256 public maxContribution;

    // The minimum poolBalance the pool must have in order to be able to buy the tokens from the targetICO
    uint256 public poolSoftCap;

    // The maximum poolBalance the pool can have. Contributions beyond this amount won't be accepted
    uint256 public poolHardCap;

    // The balance in wei each pool contributor has transferred
    mapping(address => uint256) public contributorsBalance;

    bool public investedInICO = false;

    uint256 public tokensWithdrawn = 0;

    mapping(address => uint) public tokensWithdrawnByContributor;

    /**
     * @dev Check if the address is a valid destination to transfer tokens to
     * @param _to The address to transfer tokens to
     * The zero address is not valid
     * The owner should not receive the tokens
     */
    modifier validDestination(address _to) {
        require(_to != address(0));
        require(_to != msg.sender);
        _;
    }

    constructor(
        address _targetICO,
        uint256 _minContribution,
        uint256 _maxContribution,
        uint256 _poolSoftCap,
        uint256 _poolHardCap
    ) public validDestination(_targetICO) {
        require(_minContribution > 0);
        require(_maxContribution > _minContribution);
        require(_poolHardCap > _poolSoftCap);

        targetICO = _targetICO;
        minContribution = _minContribution;
        maxContribution = _maxContribution;
        poolSoftCap = _poolSoftCap;
        poolHardCap = _poolHardCap;
    }

    function() public payable {
        require(!investedInICO);
        require(msg.value > 0);
        require(msg.value >= minContribution && msg.value <= maxContribution);
        require(contributorsBalance[msg.sender].add(msg.value) <= maxContribution);

        // Pool can't exceed hardcap
        require(poolBalance.add(msg.value) <= poolHardCap);

        // Register how much eth the pool has
        poolBalance = poolBalance.add(msg.value);

        // Register how much eth each contributor has put into the pool
        contributorsBalance[msg.sender] = contributorsBalance[msg.sender].add(msg.value);
    }

    /**
     * @dev Owner invokes this function to send eth contributions to ICO
     */
    function buyTokensFromICO() public onlyOwner {
        require(!investedInICO);
        require(poolBalance >= poolSoftCap);
        require(address(this).balance >= poolBalance);

        investedInICO = true;

        targetICO.transfer(poolBalance);
    }

    /**
     * @dev Contributors should call this function to withdraw their tokens after the ICO has distributed them
     * @param _tokenAddress The address of the token from the ICO
     */
    function withdrawTokens(address _tokenAddress) public {
        require(investedInICO);
        require(contributorsBalance[msg.sender] > 0);

        ERC20 token = ERC20(_tokenAddress);
        require(token.balanceOf(this) > 0);

        // tokenBalance is always the max tokens the pool bought (balanceOf + already withdrawn)
        uint256 tokenBalance = token.balanceOf(this).add(tokensWithdrawn);

        // Get contributor share based on his contribution vs total pool
        // poolBalance (total wei pooled) -> contributorsBalance[msg.sender] (wei put by msg.sender)
        // tokenBalance (total tokens bought with poolBalance) -> tokensToWithdraw (how many tokens corresponds to msg.sender)
        uint256 tokensToWithdraw = tokenBalance.mul(contributorsBalance[msg.sender]).div(poolBalance);
        tokensToWithdraw = tokensToWithdraw.sub(tokensWithdrawnByContributor[msg.sender]);

        require(tokensToWithdraw > 0);

         // Keep track of total tokens withdrawn and tokens withdrawn by contributor
        tokensWithdrawn = tokensWithdrawn.add(tokensToWithdraw);
        tokensWithdrawnByContributor[msg.sender] = tokensWithdrawnByContributor[msg.sender].add(tokensToWithdraw);

        require(token.transfer(msg.sender, tokensToWithdraw));
    }

    /** 
     * @dev Contributors can withdraw their eth if they decide to no longer participate in the pool
     */
    function withdrawEther() public {
        require(!investedInICO);
        require(contributorsBalance[msg.sender] > 0);

        uint256 ethToWithdraw = contributorsBalance[msg.sender];
        contributorsBalance[msg.sender] = 0;

        poolBalance = poolBalance.sub(ethToWithdraw);
        msg.sender.transfer(ethToWithdraw);
    }
}