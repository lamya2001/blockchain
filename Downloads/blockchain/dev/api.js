//npm start 
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require("./blockchain");//import our blockchain to use it
const { v1: uuidv1 } = require("uuid");//import uuid to make random string guaranteed to be unique,that we will use it as this node network address

const newAddress = uuidv1().split('-').join(''); //generate a random unique address for this node



const bitcoin = new Blockchain();//Make instance of Blockchain

/*if the request comes in with JSON data or with form data 
we will parse that data so we can access it in any one of the endpoints*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//this end pint will send to us all the blockcnain
app.get('/blockchain', function (req, res) {
    res.send(bitcoin);

});

//this end point use to create the transaction
app.post('/transaction', function (req, res) {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({ note: `This transaction will be stored in block number ${blockIndex}.` })

});

//this end point will mining for us "create new block"
app.get('/mine', function (req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        trnasactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    //create Reward for person how make this mined the new block
    //00 sender address so we will know when see 00 that is a reward transaction
    bitcoin.createNewTransaction(12.5, "00", newAddress)
    const newBlock = bitcoin.createNewBlock(previousBlockHash, blockHash, nonce);
    res.json({
        note: `New block mined sucussfully.`,
        block: newBlock
    });

});


app.listen(3000, function () {
    // to know if the app is running 
    console.log('Listening on port 3000....')
})
