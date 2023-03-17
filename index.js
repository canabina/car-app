const express = require('express');
const app = express();

console.log('S');
console.log('S');

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
console.log('bottom changes 2');

app.listen(4000);