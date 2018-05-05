const SafeMath = artifacts.require("./SafeMath.sol");
const Ownable = artifacts.require("./Ownable.sol");
const ICOPool = artifacts.require("./ICOPool.sol");
const Crowdsale = artifacts.require("./Crowdsale.sol");

module.exports = function (deployer) {

    let Crowdsale;

    deployer.deploy(SafeMath);
    deployer.deploy(Ownable);
    deployer.deploy(Crowdsale).then(() => {
        deployer.link(Crowdsale, SafeMath);
        return Crowdsale.deployed().then(instance => {
            Crowdsale = instance;
        })
    }).then(() => {
        deployer.deploy(ICOPool, Crowdsale.address, web3.toWei(1, 'ether'), web3.toWei(10, 'ether'), web3.toWei(20, 'ether'), web3.toWei(50, 'ether'));
        deployer.link(ICOPool, SafeMath);
        deployer.link(ICOPool, Ownable);
    })

};