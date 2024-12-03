var axios = require('axios');

var config = {
  method: 'get',
maxBodyLength: Infinity,
  url: 'https://datastationapi.com/api/user/',
  headers: { 
    'Authorization': 'Token 061fb06b4547e295018387a0c2eaadd178c9c6df', 
    'Content-Type': 'application/json'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data.Dataplans));
})
.catch(function (error) {
  console.log(error);
});

