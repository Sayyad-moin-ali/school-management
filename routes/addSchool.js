const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql2")
const router = express.Router();

module.exports=(db)=>{
  router.post('/addSchool', (req, res) => {
    const { name,
      address,
      latitude,
      longitude } = req.body;
  
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.execute(query, [name, address, latitude, longitude], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error inserting school' });
      }
      res.status(201).json({ message: 'School added successfully' });
    });
  });
  return router
}

