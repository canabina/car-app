const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db.js');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const sessions = {};

app.post('/auth', (req, res) => {

    const login = req.body.login;
    const password = req.body.password;

    connection.query(
        `SELECT * FROM users WHERE login = "${login}" AND password = "${password}" LIMIT 1`,
        (err, result) => {
            const user = result[0];
            if (user) {

                const token = uuidv4();
                sessions[user.id] = token;

                res.send({
                    status: 'OK',
                    message: "Success login",
                    token
                });
            } else {
                res.send({
                    status: 'ERROR',
                    message: 'Invalid login or pass'
                });
            }
        }
    );
});

app.get ('/check-token', (req, res) =>{

    const tokenIsValid = Object.values(sessions).includes(req.headers.apitoken);

    if (tokenIsValid) {
        res.send({
            status: 'OK',
            message: "Token is valid"
        })
    } else {
        res.send({
            status: 'ERROR',
            message: 'Invalid token'
        });
    }
    // status OK + msg success login
    // status error + msg token is invalid
})

app.get('/log-out', (req, res) => {
    for (let userIdKey in sessions) {
        const value = sessions[userIdKey];
        if (value === req.headers.apitoken) {
            delete sessions[userIdKey];
            return res.send({
                status: 'OK',
                message: "secsess logout"
            })

        }
    }
    res.send({
        status: 'error',
        message: "invalid token"
    })

})

app.get('/get-cars', (req, res) => {
    const ofSet = (req.query.page - 1) * req.query.limit;
    const limit = req.query.limit;
    const sql = `SELECT * FROM cars_stock LIMIT ${ofSet}, ${limit}`;
    connection.query(
        sql,
        function (err, result ) {
            res.send(result);
        }
    )

});

app.get('/delete-car', (req, res) => {
    const idCar = req.query.id,
    deleteCar = `DELETE FROM cars_stock WHERE id = ${idCar}`;
    connection.query(
        deleteCar,
        (err, result) => {
            (err) ? res.send(err) : res.send(result);
        }
    )
})


app.get(`/update-car`, (req, res) => {
    const id = req.query.id,
        brand = req.query.brand,
        model = req.query.model,
        color = req.query.color;

    if (!id) {
        return res.send("miss id");
    }
    if (!brand && !brand && !color) {
        return res.send("miss brand, color, model");
    }
    let arr = [];
    if (brand) {
     arr.push(`brand = "${brand}"`);
    }
    if (model) {
        arr.push(`model = "${model}"`);
    }
    if (color) {
        arr.push(`color = "${color}"`);
    }

    const car = `UPDATE cars_stock SET ${arr.join(',')} WHERE id IN (${id})`;
    connection.query(
        car,
        (err, result) => {
            (err) ? res.send(err) : res.send(result);
        }

    )
})

app.get(`/add-car`, (req, res) => {

        const brand = req.query.brand,
        model = req.query.model,
        color = req.query.color,
        type = req.query.type,
        stock = req.query.stock,
        engineId = req.query.engine_id;

    const addCar = `INSERT INTO cars_stock SET brand = "${brand}", model = "${model}", color = "${color}", type = "${type}", stock = "${stock}", engine_id = "${engineId}"`
    connection.query(
        addCar,
        (err, result) => {
            (err) ? res.send(err) : res.send(result);
        }

    )
})

app.listen(4000);



