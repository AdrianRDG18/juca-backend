const express = require("express");
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//Create a express Server
const app = express();

// CORS configuration
app.use(cors());

//Reading and body parsing
app.use(express.json());

//Database
dbConnection();

//Routes
app.use('/api/users', require('./routes/user.route'));
app.use('/api/login', require('./routes/auth.route'));

app.listen(process.env.APP_PORT, () => console.log(`Running on ${process.env.APP_PORT} port`))