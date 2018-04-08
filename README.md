# truffle-hdwallet-provider
Ledger Wallet-enabled Web3 provider. Use it to sign transactions with Ledger Nano S or Ledger Blue.

## Install

```
$ npm install truffle-ledger-provider
```

## General Usage

You can use this provider wherever a Web3 provider is needed, not just in Truffle. For Truffle-specific usage, see next section.

Before using Ledger Wallet-enabled Web3 provider, you must change your Ledger App configuration as follows:
- Contract data: Yes
- Browser Support: No

```javascript
var LedgerWalletProvider = require("truffle-ledger-provider");
var ledgerOptions = {
  networkId: 1, // mainnet
  path: "44'/60'/0'/0", // ledger default derivation path
  askConfirm: false,
  accountsLength: 1,
  accountsOffset: 0
};
var provider = new LedgerWalletProvider(ledgerOptions, "http://localhost:8545");
```

Parameters:

- `network`: `number`. Ethereum network ID. 1-mainnet, 3-ropsten, etc.
- `path`: `string`. HD derivation path.
- `askConfirm`: `boolean`. If true, deployment of each contract must be confirmed.
- `accountsLength`: `number`. Number of accounts to derivate.
- `accountsOffset`: `number`. Offset index to use to start derivating the accounts.

## Truffle Usage

You can easily use this within a Truffle configuration. For instance:

truffle.js
```javascript
var LedgerWalletProvider = require("truffle-ledger-provider");

var infura_apikey = "..."; // set your Infura API key
var ledgerOptions = {}; // use default options

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey),
      network_id: 3,
      gas: 4600000
    }
  }
};
```
