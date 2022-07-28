require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`
});

connection.connect(function(err) {
    if (err) {
        console.log("Error on connection: " + err);
        throw err;
    }
    console.log("Mysql is connected");
});

app.post('/search', (req, res) => {
    connection.query(`SELECT * from entries WHERE word = "${req.body.word}"`, (err, rows) => {
        if (err) {
            return res.status(500).json({message: 'INTERNAL_SERVER_ERROR'});
        };
        return res.json({
            total: rows.length,
            data: rows
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log('Server has started at port ' + port);
});
