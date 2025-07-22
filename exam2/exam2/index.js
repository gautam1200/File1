const express = require('express')
const app = express()
const mysql = require("mysql")


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student"
})
app.set("view engine", "ejs")


app.get("/", (req, res) => {

    var qry = `SELECT * FROM account`
    connection.query(qry, (err, data) => {
        if (err) throw err
        res.render("data", { data })
    })


})

app.get("/crudData", (req, res) => {


    var qry = `INSERT INTO account (name,email,password) VALUES ('${req.query.name}','${req.query.email}','${req.query.password}')`
    connection.query(qry, (err, data) => {
        if (err) throw err
        res.render("data", { data })
    })


})


// app.get('/loginData', (req, res) => {
//     var qry = `SELECT * FROM account WHERE email='${req.query.email}' AND password='${req.query.password}'`
//     connection.query(qry, (err, data) => {
//         if (err) throw err
//         res.render("welcome", { data })

//     })


// })


app.get('/loginData', (req, res) => {
    const { email, password } = req.query;

    const qry = `SELECT * FROM account WHERE email = ? AND password = ?`;
    connection.query(qry, [email, password], (err, data) => {
        if (data.length > 0) {
            res.render("welcome", { data });
        } 
        else{
            res.render("hello")
        }
    });
});


app.listen(2000)