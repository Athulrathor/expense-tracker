const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Cors options
const corsOption = require('./utils/corsOptions.utils.js');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));


//Route imports
const testRouter = require("./routes/test.route.js");
const userRouter = require('./routes/user.route.js');
const expenseRouter = require('./routes/expense.route.js');
const incomeRouter = require('./routes/income.route.js');

//Routers
app.use("/api/v1/test", testRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/expense', expenseRouter);
app.use('/api/v1/income', incomeRouter);

module.exports = app;