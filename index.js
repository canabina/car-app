const express = require('express');
const app = express();
const config = require('./config');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require("body-parser");

process.on('uncaughtException', () => {});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

routes(app);

app.listen(config.app.port, () => console.log(config.app.welcomeMessage(config)));
