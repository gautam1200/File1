const express = require('express');
const mongo = express();
mongo.set('view engine', 'ejs');

const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const client = new mongoClient('mongodb://localhost:27017/shop')
client.connect()
.then(() => {
    console.log("connection successful");
})
.catch((error) => {
    console.log(error);
    
})

const database = client.db('shop')
const collection = database.collection('product')

mongo.get("/" , async(req , res) => {
    const allData = await collection.find().toArray()
    console.log(allData);
    
    res.render('crud' , {allData , editData : null})
})


mongo.get("/createData",async(req , res) => {
        const data = req.query

        if(data.id != ''){
           await collection.updateOne({_id : new ObjectId(data.id)} , {$set : data})
        }
        else{

            await collection.insertOne(data)
        }
        res.redirect('/')
})

mongo.get("/deleteData/:id" ,async(req , res) => {
    const deleteId = req.params.id
    // console.log(deleteId);
    

   await collection.deleteOne({ _id : new ObjectId(deleteId)})
   res.redirect('/')
})

mongo.get("/updateData/:id" , async(req , res) => {
    const editId = req.params.id

    const editData = await  collection.findOne({_id : new ObjectId(editId)}) 
    const allData = await collection.find().toArray()

    res.render('crud',{editData , allData})
})

mongo.listen(1111)


