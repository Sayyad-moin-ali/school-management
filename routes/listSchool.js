const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql2")
const router = express.Router();

module.exports=(db)=>{
    router.get('/listSchool', (req, res) => {
        const { userLat, userLng } = req.query;
      
        // Validate user coordinates
        if (!userLat || !userLng) {
          return res.status(400).json({ message: 'User latitude and longitude are required.' });
        }
      
        // Calculate proximity based on latitude and longitude (Haversine formula)
        const query = `
            SELECT id, name, address, latitude, longitude,
            (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance
            FROM schools
            ORDER BY distance
          `;
      
        // Query to list schools ordered by proximity
        db.execute(query, [userLat, userLng,userLat], (err, results) => {
          if (err) {
            return res.status(500).json({ message: 'Error fetching schools.', error: err });
          }
          res.status(200).json(results);
        });
      });
      return router;
}
