const express = require('express')
const server = express()
const mysql = require('mysql')


// console.log('hello');
server.set('view engine', 'ejs')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'class'
})
connection.connect((error) => {
    if(error) throw error
    // console.log("connection success");
    
})

server.get('/', (req, res) => {
    var qry = `SELECT * FROM student`

    connection.query(qry, (error, data) => {
        if (error) throw error
        res.render('crud', { data , editData:null})
    })
})


server.get('/createData', (req, res) => {
    const data = req.query
    // console.log(data);
    const {id, name, email, password } = req.query  
    
    
    var qry = ''

    if(id != '')
    {
         qry = `UPDATE student SET name='${name}' , email= '${email}' , password = '${password}'  WHERE id='${id}'`
    }
    else
    {
        qry = `INSERT INTO student (name , email , password) values ('${name}' , '${email}' , '${password}')`
    }


    
    connection.query(qry , (error) => {
        if(error) throw error
        // console.log("data enter seccess");
    })


    res.redirect('/')
})


server.get('/deleteData/:id' , (req , res) => {
    const deleteid = req.params.id
    console.log(deleteid);

    var qry = `DELETE  FROM student WHERE id='${deleteid}'`

    connection.query(qry , (error) => {
        if(error) throw error
        console.log('data delere success');
    })
    res.redirect('/')
})

server.get('/editData/:id' , (req , res) => {
    const editid = req.params.id
    console.log(editid);
    
    var qry = `SELECT * FROM student WHERE id='${editid}'`

    connection.query(qry , (error , editData) => {
        var allqry = `SELECT * FROM student`
        connection.query(allqry , (error , data) => {

            if(error) throw error
            res.render('crud',{editData : editData[0] , data})
        })
    })
})


server.listen(3333)

