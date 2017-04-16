var express = require('express')
var request = require('request')
var fs = require('fs')
var moment = require('moment')
var router = express.Router()

var pkgs = [], timestamp;

router.get('/', function(req, res) {
  // if (timestamp > Date.now() - (1000000))

  // fs.readFile('./saved.json', function (err, body) {
  request('https://app.doorman.co/app/v1/packages', {
    headers: {
      'X-DOORMAN-AUTH-TOKEN': process.env.DOORMAN_TOKEN
    }
  }, function (err, response, body) {
    if (err) {
      throw err
      return res.status(500).send(err)
    }

    console.log(body)

    var items = JSON.parse(body)

    console.log(JSON.stringify(items, null, 4))

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
  var year = d.getFullYear()

  for (var i = 0; i < 5; i++) {
    dates.push(year + '-' + (d.getMonth() + 1) + '-' + (n +i))
  }

  res.render('schedule', {
    dates: dates,
    times: [6, 8, 10]
    // times: ['5-6', '6-7', '7-8', '8-9', '9-10', '10-11', '11-12']
  })
})

router.get('/packages.json', function (req, res) {
  return res.json({
    packages: pkgs
  })
})

router.post('/schedule', function (req, res) {
  var date = req.body.date
  var time = req.body.time
  var pkg = pkgs[0]

  console.log(pkg)

  if (pkgs.length === 0 || pkg.state === 'delivered') {
    return res.json({error: 'Sorry no packages to schedule'})
  }

  if (!date || !time) {
    return res.json({error: 'Missing time or date.'})
  }

  request.post({
    url: 'https://app.doorman.co/app/v1/delivery_schedules',
    headers: {
      'X-DOORMAN-AUTH-TOKEN': process.env.DOORMAN_TOKEN
    },
    form: {
      delivery_schedule: {
        address_id: 1371,
        deliver_on: date,
        deliver_time_begin: time,
        package_id: pkg.id
      }
    }
  }, function (err, response, body) {
    if (err) {
      console.log('doorman error')
      return res.json({
        error: true,
        err: err
      })
    }

    return res.send(body)
  })
})

module.exports = router
