// index.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const uuid = require('uuid');

const express = require('express');
const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('main', { link: '' });
});



app.post('/getToken', (req, res) => {
  let url = 'https://api.discord.gx.games/v1/direct-fulfillment';

  let options = {
    method: 'POST',
    headers: {
      'authority': 'api.discord.gx.games',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json',
      'origin': 'https://www.opera.com',
      'referer': 'https://www.opera.com/',
      'sec-ch-ua': '"Opera GX";v="105", "Chromium";v="119", "Not?A_Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 OPR/105.0.0.0'
    },
    body: JSON.stringify({ partnerUserId: uuid.v4() })
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      const initialLink = 'https://discord.com/billing/partner-promotions/1180231712274387115/';
      const token = data.token;
      const link = initialLink + token;
      res.render('main', { link: link });
    })
    .catch(error => {
      console.error('Error:', error);
      res.render('main', { link: 'Error fetching token' });
    });
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
