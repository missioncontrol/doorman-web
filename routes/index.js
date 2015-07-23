var express = require('express')
var request = require('request')
var fs = require('fs')
var moment = require('moment')
var router = express.Router()

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

var pkgs = {}, timestamp;

router.get('/packages', function(req, res) {
  // if (timestamp > Date.now() - (1000000))

  fs.readFile('./saved.json', function (err, body) {
  // request('https://app.doorman.co/app/v1/packages', {
  //   headers: {
  //     'X-DOORMAN-AUTH-TOKEN': process.env.DOORMAN_TOKEN
  //   }
  // }, function (err, response, body) {
  //   if (err) {
  //     console.error(err)
  //     return res.status(500).send(err)
  //   }

    var items = JSON.parse(body)

    pkgs = items.packages

    return res.render('packages', {
      packages: pkgs
    })
  })
})

router.get('/schedule', function (req, res) {
  var d = new Date()
  var n = d.getDate()
  var dates = []

  for (var i = 0; i < 5; i++) {
    dates.push(d.getMonth() + '/' + (n +i) + '/' + d.getFullYear())
  }

  res.render('schedule', {
    dates: dates,
    times: ['5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11-12']
  })
})

module.exports = router
