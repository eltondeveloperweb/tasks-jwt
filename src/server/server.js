const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const taskRoutes = require('../routes/task.router');
const userRoutes = require('../routes/user.router');
require('../database/database');

dotenv.config();

const port = process.env.PORT;

//configs
app.set('port', port);

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use('/api/v1',taskRoutes);
app.use('/api/v1',userRoutes);

module.exports = app;
