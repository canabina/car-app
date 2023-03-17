const express = require('express');
const app = express();

app.get('/', (req, res) => {

    res.send('Hello');
});

app.get('/', (req, res) => {

    res.send('Hello' + req + '.');
});

app.listen(4000);