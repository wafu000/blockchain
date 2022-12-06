const SHA256 = require('crypto-js/sha256');
class Block
{
constructor(index, timestamp, data, previousHash ='')
{
this.index=index;
this.timestamp=timestamp;
this.data=data;
this.previousHash=previousHash;
this.hash=this.calculateHash();
this.nonce=0;
}
calculateHash()
{
return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
}
//for difficulty
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
}
createGenesisBlock()
{
return new Block(0,"20/10/2021","Genesis Block","0");
}
getLatestBlock()
{
return this.chain[this.chain.length -1];
}
addBlock(newBlock)
{
newBlock.previousHash=this.getLatestBlock().hash;
//newBlock.hash = newBlock.calculateHash();
newBlock.mineBlock(this.difficulty); //for difficulty
this.chain.push(newBlock);
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
console.log('Mining the Block 1....');
shCoin.addBlock(new Block(1,"21/10/2021",{ amount: 4}));
console.log('Mining the Block 2....');
shCoin.addBlock(new Block(2,"22/10/2021",{ amount: 10}));
console.log(JSON.stringify(shCoin,null,4))
console.log('is blockchain is valid? ', shCoin.isChainValid());
shCoin.chain[1].data = { amount: 100};
shCoin.chain[1].hash = shCoin.chain[1].calculateHash();
console.log('Is Blockchain is valid ? ', shCoin.isChainValid());