const express = require('express')
const server = express()
const mysql = require('mysql')


console.log('hello');
server.set('view engine', 'ejs')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'class'
})
connection.connect((error) => {
    if(error) throw error
    console.log("connection success");
    
})

server.get('/', (req, res) => {
    var qry = `SELECT * FROM student`

    connection.query(qry, (error, data) => {
        if (error) throw error
        res.render('crud', { data })
    })
})


server.get('/createData', (req, res) => {
    const data = req.query
    console.log(data);
    const { name, email, password } = req.query

    var qry = `INSERT INTO student (name , email , password) values ('${name}' , '${email}' , '${password}')`
    
    connection.query(qry , (error) => {
        if(error) throw error
        console.log("data enter seccess");
        
    })

    res.redirect('/')
})


server.listen(3333)