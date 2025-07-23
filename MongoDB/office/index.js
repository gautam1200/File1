console.log("hello");

const express = require('express');
const off = express()

const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const client = new mongoClient('mongodb://localhost:27017/office')
client.connect()
    .then(() => {
        console.log("connection success");
    })
    .catch((error) => {
        console.log(error);

    })

const database = client.db('office')
const collection = database.collection('client')


off.set('view engine', 'ejs')

off.get('/', async (req, res) => {
    const datas = await collection.find().toArray()
    console.log(datas);

    res.render('office', { datas , editData: null })
})


off.get('/DataCreate', async (req, res) => {
    const data = req.query

    if(data.id != "")
    {
       await collection.updateOne({_id : new ObjectId(data.id)} , {$set : data})
    }
    else{
        await collection.insertOne(data)
    }

    res.redirect('/')
})

off.get('/DeleteData/:id', async (req, res) => {
    const deleteId = req.params.id
    // console.log(deleteId);
    await collection.deleteOne({ _id: new ObjectId(deleteId) })
    res.redirect('/')
})

off.get('/updateData/:id' , async(req , res) => {
    const editId = req.params.id
    const editData = await collection.findOne({_id: new ObjectId(editId)})
    const datas = await collection.find().toArray()
    res.render('office' , {editData , datas})
})

off.listen(2222)