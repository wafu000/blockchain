//npm install --save js-crypto-ec
const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const myKey = ec.keyFromPrivate('7b957c401f95046875635c16d78e2754535ad51a62841b31ef0e3dcafcc97ca4');
const myWalletAddress = myKey.getPublic('hex');
let myCoin = new Blockchain();
const tx1 = new Transaction(myWalletAddress,'public key goes here',10);
tx1.signTransaction(myKey);
myCoin.addTransaction(tx1);
console.log('\n Starting the miner.');
myCoin.minePendingTransactions(myWalletAddress);
console.log('\n Balance of myWalletAddress is',myCoin.getBalanceOfAddress(myWalletAddress));
console.log('Is chain valid? ', myCoin.isChainValid());
myCoin.chain[1].transactions[0].amount = 15;
console.log('Is chain valid? ', myCoin.isChainValid());