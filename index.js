const express = require('express');
const axios = require('axios');
const cors = require('cors');
const https = require('https');
const _ = require('lodash');

const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

// Initialize Express
const app = express();
app.use(cors());

// Create GET request
app.get('/', (req, res) => {
  const _url = req.query._url;
  const params = _.omit(req.query, ['_url', '_contentType']);
  const _contentType = req.query._contentType;

  const headers = {};
  if (_contentType) {
    headers['Content-Type'] = _contentType;
  }

  api
    .get(_url, {
      params,
      headers
    })
    .then(response => {
      if (_contentType === 'image/png') {
        res.sendFile(response.data);
      } else {
        res.send(response.data);
      }
    })
    .catch(err => {
      res.send(err);
    });
});

// Initialize server
app.listen(5000, () => {
  console.log('Running on port 5000.');
});
