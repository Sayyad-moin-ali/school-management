const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql2")
const router = express.Router();

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.json());
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect(err => {
    if (err) {
        console.error('Error connecting to mysql', err);
        return;
    }
    console.log('Connected to mysql');
});

const cors = require('cors');
app.use(cors());

const addSchoolRoute = require("./routes/addSchool")
const listSchoolRoute = require("./routes/listSchool")

app.use( addSchoolRoute(db));
app.use( listSchoolRoute(db))

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
