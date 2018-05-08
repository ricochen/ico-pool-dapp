module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      // geth attach \\\\.\\pipe\\geth.ipc
      // geth --rinkeby --rpc --rpcapi db,eth,net,web3,personal --unlock="0x87584f1E69f6233cd18B502660CBea4312CBA5A9" --rpccorsdomain http://localhost:8545
      host: "localhost",
      port: 8545,
      network_id: "4", // Rinkeby ID 4
      from: "0x422baffe21d13d76af304a09d24b284d4b40bb39" // account from which to deploy
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  }
};
