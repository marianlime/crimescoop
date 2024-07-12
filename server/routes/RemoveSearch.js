const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const connection = require('../db');

router.post('/', (req, res) => {
  const token = req.header('Authorization').split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: 'Unauthorised'
      });
    }

    const userId = decoded.id;
    const searchId = req.body.id;

    connection.query(`DELETE FROM searches WHERE id = ${searchId} AND user_id = ${userId}`, (error, result) => {
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