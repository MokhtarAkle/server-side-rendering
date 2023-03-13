var express = require('express');
var router = express.Router();
const url = "https://api.codingthecurbs.fdnd.nl/api/v1/smartzones";

/* GET home page. */
router.get('/', function(req, res, next) {
  let smartUrl = url 
  console.log(smartUrl)

  fetchJson(url).then((data) => {
    res.render('index', data)
  })
});



async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}

module.exports = router;