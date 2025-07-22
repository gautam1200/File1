
const express = require('express')
const offices = express()

console.log("hello");

offices.set('view engine', 'ejs')

offices.get('/' , (req , res) => {
    const data = req.query
    console.log(data);
    
})



offices.listen(1212)