//First of all, you need to import the dependencies
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//Now we're going to define the network
//bitcoin - main network - (mainnet)
//testnet - network for testing - (tesnet)
const network = bitcoin.networks.testnet

//adhesion of crypto wallets
const path = `m/49'/1'/0'/0` 

//creating mnemonics
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//creating the wallet's root
let root = bip32.fromSeed(seed, network)

//creating an account - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Generating your wallet...... Done!")
console.log("Address: ", btcAddress)
console.log("Private key:", node.toWIF())
console.log("Seed:", mnemonic)

//Made with dio.me