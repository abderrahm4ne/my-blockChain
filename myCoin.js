const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, data, previousHash = '') {
        this.index = index;
        this.timestamp = Date.now();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(
            this.index +
            this.timestamp +
            JSON.stringify(this.data) +
            this.previousHash
        ).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

const justACoin = new Blockchain();
justACoin.addBlock(new Block(1, { amount: 44 }));
justACoin.addBlock(new Block(2, { amount: -45 }));

console.log(JSON.stringify(justACoin, null, 4));