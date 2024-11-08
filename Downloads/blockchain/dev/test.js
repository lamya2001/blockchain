//importe our blockchain constructer 
//node dev/test.js 
const Blockchain = require('./blockchain.js');

//create instense of blockchain
const bitcoin = new Blockchain();
const indexOfBlock = bitcoin.createNewTransaction(200, "lam", "lam");
console.log(bitcoin.pendingTransactions)
console.log(`thes transaction will store in block of index num: ${indexOfBlock}`);

const nonce = bitcoin.proofOfWork(0, bitcoin.pendingTransactions)
console.log(nonce);
const hash = bitcoin.hashBlock(0, bitcoin.pendingTransactions, nonce)
console.log(hash)
bitcoin.createNewBlock(0, hash, nonce)

console.log(bitcoin);
