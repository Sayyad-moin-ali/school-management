const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql2")
const router = express.Router();
const cors = require('cors');


const app = express();
const port = 3000;
app.get('/test', (req, res) => {
    res.send('Test route is working!');
});
app.use(bodyParser.json());
app.use(express.json());
require('dotenv').config();
app.use(cors({ origin: '*' }));


const link=process.env.LINK

const db = mysql.createConnection(link);
    // host: process.env.MYSQLHOST,
    // port: process.env.MYSQLPORT,
    // user: process.env.MYSQLUSER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQLDATABASE,



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
app.use('/listSchool', listSchoolRoute(db))

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
