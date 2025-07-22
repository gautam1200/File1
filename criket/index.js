console.log("hello");
const express = require('express')
const Crickets = express()
const mysql = require('mysql')


Crickets.set('view engine', 'ejs')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'criket'
})
connection.connect((error) => {
    if (error) throw error
    console.log("connection success");

})

Crickets.get('/', (req, res) => {
    var qry = `SELECT * FROM product`
    connection.query(qry, (error, data) => {
        if (error) throw error
        res.render('Cricket', { data, editData: null })
    })
})

Crickets.get('/createData', (req, res) => {
    const data = req.query
    // console.log(data);

    const { id, Player_Name, Run, Innings } = req.query

    // console.log("====id====",id);
    

    var qry = ''

    if (id != '') {
        // console.log("-------------------");
        
        qry = `UPDATE product SET Player_Name ='${Player_Name}' , Run='${Run}' , Innings='${Innings}' WHERE id='${id}'`
    }
    else {
        // console.log("==================");
        
        qry = `INSERT INTO product (Player_Name , Run , Innings) values ('${Player_Name}' , '${Run}' , '${Innings}')`
    }

    connection.query(qry, (error) => {
        if (error) throw error
        console.log("data create success");

    })
    res.redirect('/')


})

Crickets.get('/deleteData/:id', (req, res) => {
    const deleteid = req.params.id
    console.log(deleteid);

    var qry = `DELETE FROM product WHERE id='${deleteid}'`
    connection.query(qry, (error) => {
        if (error) throw error
        console.log('delete data success');
        res.redirect('/')
    })

})

Crickets.get('/editData/:id', (req, res) => {
    const editid = req.params.id
    console.log(editid);

    var qry = `SELECT * FROM product WHERE id='${editid}'`

    connection.query(qry, (error, editData) => {

        // console.log(editData);
        var allqry = `SELECT * FROM product`
        connection.query(allqry, (error, data) => {
            if (error) throw error
            res.render('Cricket', { editData : editData[0]  , data })
        })
    })
})

Crickets.listen(1111)
