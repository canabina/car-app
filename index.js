const express = require('express');
const app = express();

app.get('/', (req, res) => {

    res.send('Hello');
});

app.get('/', (req, res) => {

    res.send('Hello' + req + '.');
});

app.get('/vad', (req, res) => {

    res.send('<h1>Vad!</h1>');
});

console.log('bottom changes');

app.listen(4000);