const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import route handling logic
const homeRoute = require('./Routes/HomeRoute');
const authRoutes = require('./Routes/AuthRoutes');
const editRoutes = require('./Routes/EditRoutes');
const eventRoutes = require('./Routes/EventRoutes');

// Set up Cross-Origin resource sharing & body parser
app.use(cors());
app.use(bodyparser.json())
app.use(
    bodyparser.urlencoded({
        extended : true,
    })
)

app.use('/', homeRoute);
app.use('/auth', authRoutes);
app.use('/profile', editRoutes);
app.use('/events', eventRoutes);

app.listen(3000, ()=> {
    console.log("BookIt! is up and running!");
});