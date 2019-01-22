'use strict'

require('babel-polyfill')

/**
 * Module dependencies.
 */

const FiltersSubprovider = require('web3-provider-engine/subproviders/filters.js')
const ProviderEngine = require('web3-provider-engine')
const ProviderSubprovider = require('web3-provider-engine/subproviders/provider.js')
const TransportU2F = require('@ledgerhq/hw-transport-node-hid').default
const Web3HttpProvider = require('web3-providers-http')
const createLedgerSubprovider = require('@ledgerhq/web3-subprovider').default

/**
 * Exports.
 */

module.exports = class LedgerProvider extends ProviderEngine {
  constructor(options, url, debug) {
    super()

    this.addProvider(createLedgerSubprovider(async () => {
      const transport = await TransportU2F.create()

      transport.setDebugMode(!!debug)

      return transport
    }, options))
    this.addProvider(new FiltersSubprovider())
    this.addProvider(new ProviderSubprovider(new Web3HttpProvider(url)))
    this.start()
  }
}
