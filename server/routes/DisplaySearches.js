const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get the user's search history
router.get('/', (req, res) => {
  const token = req.header('Authorization').split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: 'Unauthorised'
      });
    }

    const userId = decoded.id;

    connection.query(`SELECT * FROM searches WHERE user_id = ${userId}`, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          message: 'Error fetching search history'
        });
      }
      res.json(result);
    });
  });
});

module.exports = router;