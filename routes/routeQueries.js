const express = require('express')
const router = express.Router()


const parserDB = require('../models/modelParserDB');

const chartModel = require('../models/modelChart');

router.post('/numberOfEventsInDrive', async function (req, res, next) {
  const cameraId = req.body.cameraId;
  const infoTravel = req.body.infoTravel;

  console.log("numberOfEventsInDrive", cameraId, infoTravel)

  chartModel.viewOnOneTravel(cameraId, infoTravel).then(response => {
    res.send(response)
  })

});



router.post('/getTravelsScore', async function (req, res, next) {
  const travelIdArr = req.body.travelIdArr;
  const camera = req.body.camera;

  console.log("getTravelsScore: ", camera, travelIdArr);

  const response = await parserDB.parserGetTravelsScore(camera, travelIdArr);
  console.log("getTravelsScore: ", response)
  res.send(response)
});

router.post('/getWorstTravelIndex', async function (req, res, next) {
  const travelIdArr = req.body.travelIdArr;
  const camera = req.body.camera;

  console.log("getWorstTravelIndex: ", camera, travelIdArr);
  const response = await parserDB.parserGetTravelsScore(camera, travelIdArr);
  const worstTravelIndex = response.worstTravelIndex;
  console.log("getWorstTravelIndex: ", response)
  res.send([worstTravelIndex])
});


router.post('/viewOnAmountTravels', async function (req, res, next) {
  const cameraId = req.body.camera;
  const traveslId = req.body.id;
  console.log("viewOnAmountTravels", cameraId, traveslId)
  const response = await chartModel.viewOnAmountTravels(cameraId, traveslId)
  res.send(response)
});


router.post('/travelOnTime', async function (req, res, next) {
  const cameraId = req.body.camera;
  const traveslId = req.body.id;

  console.log("travelOnTime", cameraId, traveslId)
  const response = await chartModel.chartTravelsOnTimes(cameraId, traveslId)
  console.log("travelOnTime", response)
  res.send(response)

});

module.exports = router