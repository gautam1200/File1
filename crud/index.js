const express = require('express')
const server = express()
const mysql = require('mysql')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student'
})
connection.connect((error) => {
    if (error) throw error
    console.log("connection success");

})

// console.log('hello');
server.set('view engine', 'ejs')

server.get('/', (req, res) => {

    var qry = `SELECT * FROM class`
    // var qrys = `SELECT * FROM teacher`


    connection.query(qry, (error, data) => {
        if (error) throw error
        res.render('datas', { data, editData: null })
    })

})


server.get('/createData', (req, res) => {
    const data = req.query
    console.log(data);

    const {id , name, password } = req.query
    var qry = ''

    if(id != ''){
        qry = `UPDATE class SET name='${name}' , password='${password}' WHERE id='${id}'`
    }
    else{
        var qry = `INSERT INTO class (name , password) values ('${name}' , '${password}')`
    }


    connection.query(qry, (error) => {
        if (error) throw error
        console.log("data enter success");
    })


    res.redirect('/')
})

server.get('/deleteData/:id', (req, res) => {
    const deleteid = req.params.id
    console.log(deleteid);

    var qry = `DELETE FROM class WHERE id='${deleteid}'`
    connection.query(qry, (error) => {
        if (error) throw error
        console.log("delete data success");

        res.redirect('/')
    })
})

server.get('/editData/:id', (req, res) => {
    const editid = req.params.id
    console.log(editid);

    var qry = `SELECT * FROM class WHERE id='${editid}'`
    connection.query(qry, (error, editData) => {

        var allqry = `SELECT * FROM class`
        connection.query(allqry, (error, data) => {

            if (error) throw error
            console.log("edit success");

            res.render('datas', { editData : editData[0], data })
        })

    })
})


server.listen(4444) 