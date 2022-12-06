const SHA256 = require('crypto-js/sha256');
class Transaction{
constructor(fromAddress, toAddress, amount)
{
this.fromAddress=fromAddress;
this.toAddress=toAddress;
this.amount=amount;
}
}
class Block
{
constructor(timestamp, transactions, previousHash ='')
{
this.timestamp=timestamp;
this.transactions=transactions;
this.previousHash=previousHash;
this.hash=this.calculateHash();
this.nonce=0;
}
calculateHash()
{
return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
}
mineBlock(difficulty)
{
while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0"))
{
this.nonce++;
this.hash=this.calculateHash();
}
console.log("Block mined: "+ this.hash);
}
}
class Blockcahin
{
constructor()
{
this.chain = [this.createGenesisBlock()];
this.difficulty = 4; //for difficulty
this.pendigTransactions=[];
this.miningreword=100;
}
createGenesisBlock()
{
return new Block(Date.now(),"Genesis Block","0");
}
getLatestBlock()
{
return this.chain[this.chain.length -1];
}
minePendingTransaction(miningRewordAddress)
{
let block=new Block(Date.now(),this.pendigTransactions);
block.mineBlock(this.difficulty);
console.log("Block Successfully mined");
this.chain.push(block);
this.pendigTransactions=[new Transaction(null, miningRewordAddress,this.miningreword)];
}
createTransaction(transaction)
{
this.pendigTransactions.push(transaction);
}
getBalaceofAddress(address)
{
let balance=0;
for(const block of this.chain)
{
for(const trans of block.transactions)
{
if(trans.fromAddress == address)
{
balance -= trans.amount;
}
if(trans.toAddress == address)
{
balance += trans.amount;
}
}
}
return balance;
}
isChainValid()
{
for(let i=1; i<this.chain.length;i++)
{
const currentBlock = this.chain[i];
const previousBlock = this.chain[i-1];
if(currentBlock.hash !== currentBlock.calculateHash())
{
return false;
}
if(currentBlock.previousHash !== previousBlock.hash)
{
return false;
}
}
return true;
}
}
let shCoin = new Blockcahin();
shCoin.createTransaction(new Transaction('address1', 'address2', 100));
shCoin.createTransaction(new Transaction('address2', 'address1', 50));
console.log("\n Starting the miner....");
shCoin.minePendingTransaction('Tata-address');
console.log('\n Balance of Tata address is ', shCoin.getBalaceofAddress('Tata-address'));
console.log("\n Starting the miner again....");
shCoin.minePendingTransaction('Tata-address');
console.log('\n Balance of Tata address is ', shCoin.getBalaceofAddress('Tata-address'));