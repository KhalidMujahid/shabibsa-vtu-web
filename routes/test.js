const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Route to request a customer reserved account
app.post('/', async (req, res) => {
  console.log(req.body);
  const { email, name, phoneNumber, bankcode, account_type, businessid, bvn, nin } = req.body;

  const url = 'https://api.payvessel.com/api/external/request/customerReservedAccount/';

  const headers = {
    'api-key': 'PVKEY-5XUTPTPL6QFGPEN5JSH0BSNE88OZT4MQ',
    'api-secret': 'Bearer PVSECRET-TFW9QCF44VQDVOXSGKHAQVTEFU77RCK3KHQVTA7LNN7XQMSDGHC5Z4I7O6HZJQ21',
    'Content-Type': 'application/json',
  };

  const payload = {
    email,
    name,
    phoneNumber,
    bankcode,
    account_type,
    businessid,
    nin,
  };

  try {
    const response = await axios.post(url, payload, { headers });
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error creating reserved account:', error.message);

    if (error.response) {
      // API responded with a status code outside 2xx range
      return res.status(error.response.status).json({
        error: error.response.data,
      });
    }

    // Handle other errors (e.g., network issues)
    return res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

app.get('/get/:businessid/:account', async (req, res) => {
  const { businessid, account } = req.params;

  const url = `https://api.payvessel.com/api/external/request/virtual-account/${businessid}/${account}/`;

  const headers = {
    'api-key': 'PVKEY-5XUTPTPL6QFGPEN5JSH0BSNE88OZT4MQ',
    'api-secret': 'Bearer PVSECRET-TFW9QCF44VQDVOXSGKHAQVTEFU77RCK3KHQVTA7LNN7XQMSDGHC5Z4I7O6HZJQ21',
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(url, { headers });
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching account info:', error.message);

    if (error.response) {
      // API responded with a status code outside 2xx range
      return res.status(error.response.status).json({
        error: error.response.data,
      });
    }

    // Handle other errors (e.g., network issues)
    return res.status(500).json({ error: 'An error occurred while fetching account info.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});