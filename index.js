const express = require('express');
const axios = require('axios');
const cors = require('cors');
const https = require('https');
const _ = require('lodash');
const { URL } = require('url');

const api = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

// Initialize Express
const app = express();
app.use(cors());

// Create GET request
app.get('*', (req, res) => {
  const _url = req.query._url;
  if (!_url) {
    const error = new Error('Bad request');
    return res.send(error);
  }

  const _reqPath = req.path;
  const params = _.omit(req.query, ['_url', '_contentType', '_isImage']);
  const _contentType = req.query._contentType;
  const _isImage = req.query._isImage;

  const otherParams = {};

  if (_contentType) {
    otherParams.headers = {
      'Content-Type': _contentType
    };
  }

  if (_isImage) {
    otherParams.responseType = 'arraybuffer';
  }

  const fullUrl = `${_url}${_reqPath}`;

  api
    .get(fullUrl, {
      ...otherParams,
      params
    })
    .then(response => {
      if (_contentType) {
        res.contentType(_contentType);
      }

      res.send(response.data);
    })
    .catch(err => {
      res.send(err);
    });
});

// Initialize server
app.listen(5000, () => {
  console.log('Running on port 5000.');
});
