const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const routes = {
    "get /getcars" : [
        require('./src/get-cars')
    ],
    "post /login": [
        
    ]

}

for(const url in routes) {
  const [method, route] = url.split(' ')
    app[method](route, routes[url])
}

module.exports = app