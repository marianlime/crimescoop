const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../db');

router.post('/', (req, res) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if(error) {
      return res.status(401).json({ message: 'Unauthorised' });
    }

    const user = decoded;
    const name = req.body.address;
    const lat = Number(req.body.lat).toFixed(7);
    const lng = Number(req.body.lng).toFixed(7);

    connection.query(`SELECT * FROM searches WHERE user_id = ? AND lat = ? AND lng = ?`, [user.id, lat, lng], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Failed to check for duplicate search' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'This search has already been tracked' });
      }

      connection.query(`INSERT INTO searches (user_id, name, lat, lng) VALUES (?, ?, ?, ?)`, [user.id, name, lat, lng], error => {
        if (error) {
          return res.status(500).json({ message: 'Failed to add tracked search' });
        }

        return res.status(200).json({ message: 'Tracked search added successfully' });
      });
    });
  });
});

module.exports = router;