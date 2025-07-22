const express = require('express')
const app = express()
const fs = require('fs')
app.set("view engine", "ejs")
const path = require('path');

app.set('views', path.join(__dirname, 'views'));

let storeData = []
const readData = fs.readFileSync("data.json", "utf-8")
if (readData != "") {
    storeData = JSON.parse(readData)

}

app.get("/", (req, res) => {
    res.render("crud", { storeData })
})

app.get("/deleteData/:deleteId",(req,res)=>{
    const deleteId = req.params.deleteId

    const deleteData= storeData[deleteId]
    storeData.splice(deleteId,1)
    const writeData = JSON.stringify(storeData)
    fs.writeFileSync("data.json", writeData)
    
})




app.listen(3333)