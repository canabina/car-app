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
        `SELECT *  FROM users WHERE login = "${login}" AND password = "${password}" LIMIT 1`,
        (err, result) => {
            const user = result[0];
            if (user) {
                const token = uuidv4();
                sessions[user.id] =
                    token;

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

app.listen(4000);