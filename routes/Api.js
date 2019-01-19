var express = require('express');
var router = express.Router();
var TruckModal = require('../models/Truck');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/createTruck', (req, res) => {
  console.log(req.body);
  let insetVal = req.body;
  if (insetVal.owner && insetVal.truckId, insetVal.truckReg) {
    TruckModal.findOne({
      "truckReg": insetVal.truckReg
    }, (err, doc) => {
      if (err) {
        console.log('error in mongodb')
      } else if (doc == null) {
        let newTruck = new TruckModal(insetVal);
        newTruck.save(function (err, doc) {
          if (err) {
            console.log(err)
            res.status(500).json({
              'message':"error occured"
            })
          }
          // saved!
          else {
            res.status(201).send(doc)
          }
        })
      } else {
        res.status(409).json({
          "message": "truck is already exsist with truck Registration number"
        })
      }
    })

  } else {
    res.status(400).json({
      "message": "truck registration number  or owner or capacity is nodt defiend"
    })
  }

  // res.send(req.body);
});


router.get('/getTruck', async (req, res) => {
  console.log(req.query.truckReg)
  if (typeof req.query.truckReg == 'undefined') {
    res.status(400).json({
      "message": "truck registration number not provided "
    });
  }
  let truck = await TruckModal.findOne({
    "truckReg": req.query.truckReg
  })
  if (truck == null) {
    res.status(404).send({
      "message": `truck not found with the reg number : ${req.query.truckReg}`
    })
  } else {
    res.status(200).send(truck)
  }

});
router.get('/allTruck', async (req, res) => {
  console.log('all')
  let allTruck = await TruckModal.find({});
  if (allTruck == null) {
    res.status(404).json({
      "message": "empty truck station "
    })

  }

  res.status(200).json(allTruck);
});

router.put('/updateLocation', (req, res) => {
  var truckReg = req.body.truckReg;
  var lat = req.body.location.Latitude;
  var long = req.body.location.Longitude;
  TruckModal.update({
    "truckReg": truckReg
  }, {
    $push: {
      location: {
        lat,long

      }
    }
  }, {
    new: true
  }, (err, doc) => {
    if (err) {
      res.status(500).json({
        "message": "error occured"
      })
    } else {
      if(doc.nModified==0){
           res.status(400).json({
             "message": "Invalid Truck Reg no"
           })
      }else{
res.status(201).json({
  "message": "Location lat long updated sucessfully "
})
      }
      
    }
  })
});

router.get('/locationList', async(req,res)=>{
  let truckReg=req.query.truckReg;
  if(typeof truckReg=='undefined'){
    res.status(400).json({
      message:"request doest not have truckReg"
    })
  
  }
  else{
    TruckModal.findOne({
      'truckReg':truckReg
    }, 'location', (err, doc) => {
      if (err) res.status(500).json({
        "message":"error occired"
      })
      else{
         
        if(doc==null){
          res.status(404).json({
            message:"truck reg invalid"
          })
        }
          
         res.send(doc.location.reverse())
      }
    })
   
    }

})
module.exports = router;