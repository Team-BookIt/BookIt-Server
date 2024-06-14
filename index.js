const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const testRoute = require('./Routes/testRoute');

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