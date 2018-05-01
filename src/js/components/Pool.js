import React from 'react'

class Pool extends React.Component {
    constructor(props) {
        super(props);

        const ICOPoolContract = new props.web3.eth.Contract([{ "constant": true, "inputs": [], "name": "investedInICO", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "tokensWithdrawnByContributor", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "buyTokensFromICO", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "tokensWithdrawn", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_tokenAddress", "type": "address" }], "name": "withdrawTokens", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "poolHardCap", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdrawEther", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "poolSoftCap", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "contributorsBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "maxContribution", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "poolBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "minContribution", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "targetICO", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_targetICO", "type": "address" }, { "name": "_minContribution", "type": "uint256" }, { "name": "_maxContribution", "type": "uint256" }, { "name": "_poolSoftCap", "type": "uint256" }, { "name": "_poolHardCap", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }]);

        this.state = {
            ICOPoolContract: ICOPoolContract,
            ICOPoolContractInstance: 0
        }
    }

    onFieldValueChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    createNewPool(event) {
        event.preventDefault();

        const ICOPoolContractInstance = this.state.ICOPoolContract.new(this.state.targetICO, this.state.minContribution, this.state.maxContribution, this.state.poolSoftCap, this.state.poolHardCap, { from: this.state.poolCreator });

        console.log(this.state)
    }

    render() {
        return (
            <form onSubmit={this.createNewPool.bind(this)}>
                <h1>
                    Create A Pool
                </h1>
                <div>
                    <label>Your Wallet Address</label>
                    <input type="text" name="poolCreator" value={this.state.poolCreator} onChange={this.onFieldValueChange.bind(this)} />
                </div>
                <div>
                    <label>ICO Address</label>
                    <input type="text" name="targetICO" value={this.state.targetICO} onChange={this.onFieldValueChange.bind(this)} />
                </div>
                <div>
                    <label>Minimum Per Contributor (ETH)</label>
                    <input type="text" name="minContribution" value={this.state.minContribution} onChange={this.onFieldValueChange.bind(this)} />
                </div>
                <div>
                    <label>Maximum Per Contributor (ETH)</label>
                    <input type="text" name="maxContribution" value={this.state.maxContribution} onChange={this.onFieldValueChange.bind(this)} />
                </div>
                <div>
                    <label>Minimum Allocation (ETH)</label>
                    <input type="text" name="poolSoftCap" value={this.state.poolSoftCap} onChange={this.onFieldValueChange.bind(this)} />
                </div>
                <div>
                    <label>Maximum Allocation</label>
                    <input type="text" name="poolHardCap" value={this.state.poolHardCap} onChange={this.onFieldValueChange.bind(this)} />
                </div>

                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default Pool