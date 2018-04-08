var ProviderEngine = require("web3-provider-engine");
var FiltersSubprovider = require('web3-provider-engine/subproviders/filters.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");
var TransportU2F = require("@ledgerhq/hw-transport-node-hid").default;
var createLedgerSubprovider = require("@ledgerhq/web3-subprovider").default;

function LedgerProvider(ledgerOptions, provider_url) {
  const getTransport = () => TransportU2F.create();
  const ledger = createLedgerSubprovider(getTransport, ledgerOptions);
  this.engine = new ProviderEngine();
  this.engine.addProvider(ledger); 
  this.engine.addProvider(new FiltersSubprovider());
  this.engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(provider_url)));
  this.engine.start();

  this.sendAsync = function() {
    this.engine.sendAsync.apply(this.engine, arguments);
  };
  
  this.send = function() {
    return this.engine.send.apply(this.engine, arguments);
  };
  
  this.getAddress = function() {
    return this.address;
  };
};

module.exports = LedgerProvider;
