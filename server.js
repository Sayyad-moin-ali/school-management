const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql2")
const router = express.Router();
const cors = require('cors');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());
require('dotenv').config();
app.use(cors({ origin: '*' }));

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.connect(err => {
    if (err) {
        console.error('Error connecting to mysql', err);
        return;
    }
    console.log('Connected to mysql');
});


const addSchoolRoute = require("./routes/addSchool")
const listSchoolRoute = require("./routes/listSchool")

app.use('/addSchool', addSchoolRoute(db));
app.use( '/listSchool', listSchoolRoute(db))

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
