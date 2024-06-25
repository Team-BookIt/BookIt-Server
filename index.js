const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import route handling logic
const testRoute = require('./Routes/AuthRoutes');

// Set up Cross-Origin resource sharing & body parser
app.use(cors());
app.use(bodyparser.json())
app.use(
    bodyparser.urlencoded({
        extended : true,
    })
)

app.listen(3000, ()=> {
    console.log("BookIt! is up and running!");
});

app.use('/', testRoute);