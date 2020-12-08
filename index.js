const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(cors());

// Create GET request
app.get('/', (req, res) => {
  const { _url, ...params } = req.query;

  axios
    .get(_url, {
      params
    })
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      res.send(err);
    });
});

// Initialize server
app.listen(5000, () => {
  console.log('Running on port 5000.');
});
