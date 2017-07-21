const cheerio = require('cheerio');
const axios = require('axios');
const url = 'http://thecodinglove.com/random';

function reload () {
  axios.get(url)
  .then((response) => {
    const $ = cheerio.load(response.data);
    document.querySelector('#image').src = $('.post img').attr('src');
    document.querySelector('#text').innerHTML = new Option($('.post h3').text()).innerHTML;
    document.querySelector('#author').innerHTML = new Option($('.post i').text()).innerHTML;
  })
  .catch((error) => {
    console.log(error);
    reject(error);
  });
}

setInterval(reload, 60 * 1000)
reload()
