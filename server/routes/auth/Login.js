const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../../db');

const router = express.Router();
const secret = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required fields."
      });
    }

    const user = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (error, results) => {
          if (error) {
            return reject(error);
          }

          resolve(results[0]);
        }
      );
    });

    if (!user) {
      return res.status(400).json({
        error: "Incorrect email or password."
      });
    }

    const passwordMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      });
    });

    if (!passwordMatch) {
      return res.status(400).json({
        error: "Incorrect email or password."
      });
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
    }, secret, {
      expiresIn: "30d"
    });

    res.json({
      success: true,
      token: token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error."
    });
  }
});

module.exports = router;