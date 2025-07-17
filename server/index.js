const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

let storeData = [];
let editId = null;

const filePath = path.join(__dirname, 'index1.json');

if (fs.existsSync(filePath)) {
    const readData = fs.readFileSync(filePath, 'utf-8').trim();
    if (readData !== '') {
        try {
            storeData = JSON.parse(readData);
        } catch (err) {
            console.error('JSON parse error:', err.message);
        }
    }
}


app.get('/', (req, res) => {
    res.render('data', { storeData, editData: null });
});


app.get('/createData', (req, res) => {
    const data = req.query;

    if (editId != null) {
        storeData[editId] = data;
        editId = null;
    } else {
        storeData.push(data);
    }

    fs.writeFileSync(filePath, JSON.stringify(storeData, null, 2));
    res.redirect('/');
});


app.get('/deleteData/:deleteId', (req, res) => {
    const deleteId = parseInt(req.params.deleteId);
    if (!isNaN(deleteId) && deleteId >= 0 && deleteId < storeData.length) {
        storeData.splice(deleteId, 1);
        fs.writeFileSync(filePath, JSON.stringify(storeData, null, 2));
    }
    res.redirect('/');
});


app.get('/editData', (req, res) => {
    editId = parseInt(req.query.editId);
    const editData = storeData[editId] || null;
    res.render('data', { storeData, editData });
});

app.listen(2222);
