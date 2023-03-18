const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

const connection = require('./db.js');
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

function prepareCar(results) {
    return  results.map((car)=> {
        return `Id: ${car.id} Brand: ${car.brand} Model: ${car.model} InSt: ${car.stock_count}`;
    }).join('<br/>');
}

app.get('/get-cars', (req, res) => {
    connection.query(
        'SELECT * FROM `cars`',
        function(err, results) {
            res.send(prepareCar(results));
        }
    );
})

app.get('/get-car/:id', (req, res) => {
    connection.query(
        `SELECT * FROM cars WHERE id = ${req.params.id}`,
        function(err, results) {
            res.send(prepareCar(results));
        }
    );
})

app.post('/update-car', (req, res) => {
    connection.query(
        `UPDATE cars SET brand = '${req.body.name}' WHERE id = ${req.body.id}`,
        function(err, results) {
            // res.send(results); // results contains rows returned by server
            return res.send('OK!');
        }
    );
})

app.listen(4000);