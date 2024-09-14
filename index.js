const express = require("express");
require('dotenv').config();
const { dbConnection } = require('./database/config');

//Create a express Server
const app = express();

//Database
dbConnection();

app.listen(process.env.APP_PORT, () => console.log(`Running on ${process.env.APP_PORT} port`))