const express = require("express");
const request = require("request");
const router = express.Router();
const calculateDistance = require("./CalculateDistance");
const connection = require('../../db');

router.post('/', (req, res) => {
  const {
    lat,
    lng
  } = req.body;
  console.log(`Received coordinates: ${lat}, ${lng}`);
  const sideDistance = 200;

  const topLeft = {
    lat: lat + (sideDistance / calculateDistance(lat, lng, lat + 1, lng)),
    lng: lng + (sideDistance / calculateDistance(lat, lng, lat, lng + 1)),
  };
  const topRight = {
    lat: lat + (sideDistance / calculateDistance(lat, lng, lat + 1, lng)),
    lng: lng - (sideDistance / calculateDistance(lat, lng, lat, lng - 1)),
  };
  const bottomRight = {
    lat: lat - (sideDistance / calculateDistance(lat, lng, lat - 1, lng)),
    lng: lng - (sideDistance / calculateDistance(lat, lng, lat, lng - 1)),
  };
  const bottomLeft = {
    lat: lat - (sideDistance / calculateDistance(lat, lng, lat - 1, lng)),
    lng: lng + (sideDistance / calculateDistance(lat, lng, lat, lng + 1)),
  };
  const poly = `${topLeft.lat},${topLeft.lng}:${topRight.lat},${topRight.lng}:${bottomRight.lat},${bottomRight.lng}:${bottomLeft.lat},${bottomLeft.lng}`;

  request(`https://data.police.uk/api/crimes-street/all-crime?poly=${poly}`, (error, response, body) => {
    if (error) {
      console.log(`Error: ${error}`);
      res.sendStatus(500);
    } else {
      console.log(`Status code from data.police.uk: ${response.statusCode}`);
      const crimes = JSON.parse(body);
      const crimeCounts = {};
      let maxCount = 0;
      let maxCrime = '';

      
      const CrimeRating = (crimes) => {
      const crimePoints = {
        "burglary": 10, 
        "anti-social-behaviour": 2, 
        "bicycle-theft": 4,
        "criminal-damage-arson": 8, 
        "drugs": 6, 
        "other-theft": 4, 
        "possession-of-weapons": 8, 
        "public-order": 2, 
        "robbery": 10,
        "shoplifting": 2, 
        "theft-from-the-person": 6, 
        "vehicle-crime": 6, 
        "violent-crime": 10, 
        "other-crime": 2
        };
        
        let totalCrimeScore = 0;

        crimes.forEach((crimes) => {
          totalCrimeScore += crimePoints[crimes.category];
        })
        return totalCrimeScore;
      };
      const crimeRating = CrimeRating(crimes);

        

      for (let i = 0; i < crimes.length; i++) {
        const category = crimes[i].category;
        if (crimeCounts[category]) {
          crimeCounts[category]++;
        } else {
          crimeCounts[category] = 1;
        }

        if (crimeCounts[category] > maxCount) {
          maxCount = crimeCounts[category];
          maxCrime = category;
        }
      }

      connection.query('SELECT * FROM resource WHERE category = ?', [maxCrime], (error, results) => {
        if (error) {
          console.error('Error fetching links:', error);
          res.status(500).json({ error: 'Failed to fetch links' });
        } else {
          const link = results;
          const result = {
            crimes: crimes,
            mostRepeatedCrime: maxCrime,
            preventionLink: link,
            crimeRating: crimeRating
          };
      
          res.set('Content-Type', 'application/json');
          res.send(result);
        }
      });
    }
  });
});

module.exports = router;
