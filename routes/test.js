const axios = require('axios');
const fs = require('fs');

const username = 'Shabibsadata';
const password = 'safisham1$';

const authHeader = Buffer.from(`${username}:${password}`).toString('base64');

axios.post('https://legitdataway.com/api/user', null, {
  headers: {
    'Authorization': `Basic ${authHeader}`
  }
})
  .then(response => {
    fs.writeFileSync('response.json', JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error('Error:', error);
  });


  const axios = require('axios');

const payload = {
  network: 1,
  phone: '08032904452',
  data_plan: 1,
  bypass: false,
  'request-id': 'Data_12345678900'
};

const headers = {
  'Authorization': 'Token bd6d6b83973b3182eec75152997ef09e6ee6e94e58fec16ce62fc838bfb8',
  'Content-Type': 'application/json'
};

axios.post('https://legitdataway.com/api/data', payload, { headers })
  .then(response => {
    console.log(response.data); // Handle the response data
  })
  .catch(error => {
    console.error('Error:', error); // Handle errors
  });
