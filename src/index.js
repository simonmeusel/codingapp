const cheerio = require('cheerio');
const axios = require('axios');
const initialUrl = 'https://thecodinglove.com/postponing-the-deadline';
const settings = require('electron-settings');

let nextUrl = initialUrl;

function getTime() {
  return settings.get('time', 30 * 1000)
}

function reload() {
  axios.get(nextUrl)
    .then((response) => {
      const $ = cheerio.load(response.data);
    
      let image = $('.blog-post-content object').attr('data');
      if (!image) {
        image = $('.blog-post-content img').attr('src');
      }
    
      document.querySelector('#image').src = image;
      document.querySelector('#text').innerHTML = new Option($('.blog-post-title').text()).innerHTML;
      document.querySelector('#author').innerHTML = new Option($('.post-meta-info b').text()).innerHTML;
      nextUrl = $('i.fa-random').parent().attr('href');
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    });
  console.log(getTime())
  setTimeout(reload, getTime())
}

reload()
