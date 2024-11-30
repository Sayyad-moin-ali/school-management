const express = require('express');
const router = express.Router();
module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    router.post('/', (req, res) => {
        const { name, location, latitude, longitude } = req.body;

        // Validation
        if (!name || !location) {
            return res.status(400).json({ error: 'Name and location are required' });
        }

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required' });
        }

        // Insert school into the database
        const query = `
            INSERT INTO schools (name, address, latitude, longitude)
            VALUES (?, ?, ?, ?)
        `;
        db.execute(query, [name, location, latitude, longitude], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to add school to the database.' });
            }

            res.status(201).json({ message: 'School added successfully!', schoolId: results.insertId });
        });
    });

    return router;
};

