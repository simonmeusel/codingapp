const cheerio = require('cheerio');
const axios = require('axios');
const url = 'http://thecodinglove.com/random';
const settings = require('electron-settings');

function getTime () {
  return settings.get('time', 30 * 1000)
}

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
  console.log(getTime())
  setTimeout(reload, getTime())
}

reload()
