// implementation of  PoW.....
const SHA256 = require('crypto-js/sha256');
class Block
{
    constructor(fromAddress,toAddress,amount)
    {
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;
    }

    calculateHash1()
    {
        return SHA256(this.fromAddress+this.toAddress+this.amount).toString();
    }

    constructor(index,timestamp,data,previousHash= ' ')
    {
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();    

    }

    calculateHash()
    {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify
            (this.data) + this.nonce).toString();

    }
}
class Blockchain
{
    constructor()
    {
        this.chain=[this.createGenesisBlock()];

    }
    createGenesisBlock()
    {
        return new Block(0,"15/09/2021","Genesis Block","0");
    }
getLatestBlock()
{
    return this.chain[this.chain.length-1];

}
addBlock(newBlock)
{
    newBlock.previousHash=this.getLatestBlock().hash;
    newBlock.hash=newBlock.calculateHash();
    this.chain.push(newBlock);

}
isChainValid()
{
    for (let i=1;i<this.chain.length;i++)
    {
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i-1];
        if(currentBlock.hash !== currentBlock.calculateHash())
        {
            return false;

        }
        if (currentBlock.previousHash !== previousBlock.hash)
        {
            return false
        }
    }
    return true;
    }
}
let Supra = new Blockchain();
console.log("Adding BLocks...");
Supra.addBlock(new Block(1,"31/08/2022",{amount :4000}));
Supra.addBlock(new Block(2,"06/09/2022",{amount :2000}));
console.log(JSON.stringify(Supra,null,4));
console.log('Is blockchain valid ' + Supra.isChainValid());


Supra.chain[2].data={amount :3000}; //this line is added for data alteration 
console.log(JSON.stringify(Supra,null,4));
console.log('Is blockchain valid ' + Supra.isChainValid());