const express = require('express')
const server = express()
const mysql = require('mysql')


const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'student'
})
connection.connect((error) => {
    if(error) throw error
    console.log("connection success");
    
})

// console.log('hello');
server.set('view engine','ejs')

server.get('/' , (req , res ) => {

    var qry = `SELECT * FROM class`

    connection.query(qry , (error , data) => {
        if(error) throw error
        res.render('datas',{data})
    })

})

server.get('/createData',(req , res) => {
    const data = req.query
    console.log(data);
    const {name , password} = req.query

    var qry = `INSERT INTO class (name , password) values ('${name}' , '${password}')`

    connection.query(qry , (error) => {
        if(error) throw error
        console.log("data enter success"); 
    })
    res.redirect('/')
})

server.listen(4444)