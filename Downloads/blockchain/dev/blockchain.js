/*We can do it as a class rather than a function all of them are correct 
class Blockchain{
    constructor(){
        this.chain=[];
        this.pendingTransactions=[];  
    }
}
*/

const sha256 = require('sha256');

//blockchain constructer function 
function Blockchain() {
    //all blocks will be stored in this array as chain
    this.chain = [];
    //This will hold all transactions that we create before they are placed in a block
    this.pendingTransactions = [];
    //create genesis block 
    this.createNewBlock('0', '0', 100);
}

//create new block method
Blockchain.prototype.createNewBlock = function (previousHash, hash, nonce) {
    //create new block that will stored in the chain array
    const newBlock = {
        index: this.chain.length + 1,//the block number
        timestamp: Date.now(),//time stamp to know which time the block is created
        transaction: this.pendingTransactions,//put all transaction made in this block
        nonce: nonce,//number used once which is the parameter that we passed in the function
        hash: hash, //The result of hash method
        previousHash: previousHash//The hash number of the previous block
    };

    this.pendingTransactions = [];//Empty the transaction array for the new block
    this.chain.push(newBlock);//Store the new block we made in the chain

    return newBlock;
}

Blockchain.prototype.getLastBlock = function () {

    return this.chain[this.chain.length - 1];
}

/*function create new transaction ,
    add the transaction to pendingTransactions list and 
    return block that will store the created transaction.
*/
Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {

    const NewTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    }

    this.pendingTransactions.push(NewTransaction);
    //get the index proprty of the last block then + 1 to get the index number of next block
    return this.getLastBlock()['index'] + 1;//Return the  number of next block in chain , so we can know which block will store pending transaction.
}

//Hash function will change all data to string then will hash it 
Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
    //Add all data we pass so it will be as one single string
    const dataAsString = previousBlockHash + JSON.stringify(currentBlockData) + nonce.toString();
    const hash = sha256(dataAsString);//create the hash

    return hash;
}
// function to find the nonce that makes hash start with four zeros '0000...'
Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) !== '0000') {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    return nonce;
}


//We export the construct function to use it in the test.js file
module.exports = Blockchain;