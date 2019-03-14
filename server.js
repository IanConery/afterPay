require('dotenv').config();
const path = require('path');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const { merchantId, secretKey } = process.env;

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'client')));

const sendToEndPoint = async (data, endPoint = '') => {
  const mainApi = 'https://api.us-sandbox.afterpay.com/v1/';
  const authBuff = new Buffer(`${merchantId}:${secretKey}`);
  const authHeader = authBuff.toString('base64');
  const headers = {
    Authorization: `Basic ${authHeader}`,
    'Content-Type': 'application/json'
  };
  try {
    const result = await axios({
      url: `${mainApi}${endPoint}`,
      method: 'POST',
      headers,
      data
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

app.get('/', async (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'client/index.html'));
});

app.post('/checkout', async (req, res) => {
  const { data } = req;
  // format data for api if needed
  try {
    // sendToEndPoint(data, 'payment');
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(port, () => {
  console.log(`Connection successfull:\nServer listening on port ${port}`);
});