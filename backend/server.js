const express = require('express')
const dotenve = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors')

dotenve.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
client.connect();

const dbName = 'passop'
const app = express()
const port = 3000

  

app.use(cors())
app.use(bodyParser.json())
  

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password)
    res.send({sucess: true, result:findResult})
})

app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password)
    res.send({sucess: true, result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})