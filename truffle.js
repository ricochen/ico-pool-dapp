module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // eslint-disable-line camelcase
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: "4",
      from: "0xacfa76dbd4a46d5497f8d657cfc8a343c69b584d" // account from which to deploy
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
