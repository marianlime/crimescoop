const express = require('express');
const cors = require('cors');

const coordinates = require("./routes/coordinates/Coordinates")
const register = require("./routes/auth/Register");
const login = require('./routes/auth/Login');
const trackSearch = require('./routes/TrackSearch');
const displaySearches = require('./routes/DisplaySearches');
const removeSearch = require("./routes/RemoveSearch");
const FetchCrimePrevention = require("./routes/FetchCrimePrevention");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/coordinates', coordinates);
app.use('/register', register);
app.use('/login', login);
app.use('/track', trackSearch);
app.use('/searches', displaySearches);
app.use('/remove-search', removeSearch);
app.use('/resources', FetchCrimePrevention);

app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});