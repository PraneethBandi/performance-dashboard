var express = require('express');
var router = express.Router();
var DBservice = require('../Services/dbservice');

router.use(function (req, res, next) {
  console.log("request -" + req);
  next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Api endpint is up and running....');
});


router.route('/run')
  
  //get
  .get(function (req, resp) {
    DBservice.getServiceRuns(function (err, data) {
      if (err) {
        resp.send(err);
      }
      else {
        resp.json(data); 
      }
    });
  })

  //post
  .post(function (req, resp) {
    
    if (req.body) {
      DBservice.InsertBulk([req.body], 'runs', function () {
        console.log("run saved...");
        resp.send("data saved");
      });
    }
    else {
      resp.send(500, "Invalid data");
    }
  });

router.route('/run/:runId')
  //get
  .get(function (req, resp) {
    var runId = req.params.runId;
    DBservice.getServiceRunsById(runId, function (err, data) {
      if (err) {
        resp.send(err);
      }
      else {
        resp.json(data); 
      }
    });
  })

  //post
  .post(function (req, resp) {
    resp.send("not implemented");
  });

router.route('/servicerun/:runid')
  .post(function (req, resp) {
    saveServices(req.body.data);
    resp.send("data saved");
  })
  .get(function (req, resp) {
    resp.send("not implemented");
  });

function saveServices(data) {
  if (data) {
    DBservice.InsertBulk(data, 'servicetimings', function () {
      console.log("data saved...");
    })
  }  
};

module.exports = router;
