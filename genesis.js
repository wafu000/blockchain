//npm install --save crypto-js
const SHA256=require('crypto-js/sha256');
class Block
{
constructor(index,timestamp,data,previousHash ='')
{
this.index = index;
this.timestamp = timestamp;
this.data = data;
this.previousHash = previousHash;
this.hash = this.calculateHash();
}
calculateHash()
{
return SHA256(this.index + this.previousHash + this.timestamp +
JSON.stringify(this.data)).toString();
}
}
class Blockchain
{
constructor()
{
this.chain =[this.createGenesisBlock()];
}
createGenesisBlock()
{
return new Block(0, "20/10/2021","Genesis Block","0");
}
getLatestBlock()
{
return this.chain[this.chain.length - 1];
}
addBlock(newBlock)
{
newBlock.previousHash=this.getLatestBlock().hash;
newBlock.hash = newBlock.calculateHash();
this.chain.push(newBlock);
}
}
let MCoin = new Blockchain();
console.log('Mining the Block1...')
MCoin.addBlock(new Block(1,"07/12/2022", { amount: 4}));
console.log('Mining the Block2...')
MCoin.addBlock(new Block(2,"08/12/2022", { amount: 10}));
console.log(JSON.stringify(MCoin,null,4));