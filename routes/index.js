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


router.post('/', (request, response) => {
  const baseurl = "https://api.codingthecurbs.fdnd.nl/api/v1"

  const url1 = `${baseurl}/reservations`

  postJson(url1, request.body).then((data) => {
    let newZone = { ... request.body }
    console.log(request.body)
    console.log(data)
    if (data.success) {
      response.redirect('/?memberPosted=true') 
      // TODO: squad meegeven, message meegeven
      // TODO: Toast meegeven aan de homepagina

    } else {
      const errormessage = `${data.message}: Mogelijk komt dit door de slug die al bestaat.`
      const newdata = { error: errormessage, values: newZone }

      console.log(newdata)
    }
  })
})

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}

async function postJson(url, body) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}

module.exports = router;