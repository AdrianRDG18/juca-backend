const express = require("express");
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//Create a express Server
const app = express();

// CORS configuration
app.use(cors());

//Database
dbConnection();

app.listen(process.env.APP_PORT, () => console.log(`Running on ${process.env.APP_PORT} port`))