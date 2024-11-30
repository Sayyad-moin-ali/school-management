const express = require('express');
const router = express.Router();
module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    router.post('/', (req, res) => {
        const { name, location } = req.body; // Adjust field names based on your data

        if (!name || !location) {
            return res.status(400).json({ error: 'Name and location are required.' });
        }

        const query = 'INSERT INTO schools (name, location) VALUES (?, ?)';
        db.query(query, [name, location], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error.' });
            }
            res.status(201).json({ message: 'School added successfully.', schoolId: result.insertId });
        });
    });

    return router;
};
