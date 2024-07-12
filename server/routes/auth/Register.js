const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../../db');

router.post('/', async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email, and password are required fields."
      });
    }

    const emailExists = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (error, results) => {
          if (error) {
            return reject(error);
          }

          resolve(results.length > 0);
        }
      );
    });

    if (emailExists) {
      return res.status(400).json({
        error: "Email is already in use."
      });
    }

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          return reject(error);
        }

        resolve(hash);
      });
    });

    await new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve();
        }
      );
    });

    res.json({
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error."
    });
  }
});

module.exports = router;