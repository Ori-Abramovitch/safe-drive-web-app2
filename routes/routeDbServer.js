const express = require('express')
const router = express.Router()
const DbServer = require('../models/modelDbServer')

DbServer.init();


router.post('/getCamerasOfUser', async function (req, res, next) {
  const userId = res.userData.email;
  console.log("getCamerasOfUser", userId)
  DbServer.getCamerasOfUser(userId).then(response => res.send(response)).catch(err => {
    console.log("error occurred: ", err.message)
    res.status(400).send("ERROR_CODE");
  });
});

router.post('/getTittleTravels', async function (req, res, next) {
  const cameraId = req.body.cameraId;
  console.log("getTittleTravels ", cameraId);
  DbServer.getTittleTravels(cameraId).then(response => { res.send(response.reverse()) })
    .catch(err => {
      console.log("error occurred: ", err.message)
      res.status(400).send("ERROR_CODE");
    });
});

router.post('/getTravels', async function (req, res, next) {
  const cameraId = req.body.cameraId;
  const travelId = req.body.travelId;
  console.log("getTravels", cameraId);
  console.log("getTravels", travelId);
  DbServer.getTravels(cameraId, travelId).then(response => res.send(response))
    .catch(err => {
      console.log("error occurred: ", err.message)
      res.status(400).send("ERROR_CODE");
    });
});


router.post('/updateCamera', async function (req, res) {
  const userId = res.userData.email;
  const cameraId = req.body.cameraId;
  const pass = req.body.pass;
  console.log("in updateCamera", userId, cameraId, pass);
  
  DbServer.updateCamera(userId, cameraId, pass).then(response => res.send(response))
    .catch(err => {
      console.log("error occurred: ", err.message)
      res.send(false);
    });
});

router.post('/deleteCamera', async function (req, res) {
  const userId = res.userData.email;
  cameraId = req.body.cameraId;
  console.log("deleteCamera ", cameraId);
  DbServer.deleteCamera(userId, [cameraId])
    .then(response => res.send(response)).catch(err => {
      console.log("error occurred: ", err.message)
      res.status(400).send("ERROR_CODE");
    });
});


router.post('/signUp', async function (req, res) {
  const userId = res.userData.email;

  DbServer.signUp(userId)
    .then(response => res.send(response));
});


router.post('/setConfOfArrCamera', async function (req, res) {
  const camerasArr = req.body.camerasArr;
  const eyes = req.body.eyes;
  const phone = req.body.phone;
  const yawning = req.body.yawning;
  const yawningAlert = req.body.yawningAlert;

  console.log("setConfOfArrCamera", camerasArr, eyes, phone, yawning, yawningAlert);
  if (req.body.email != undefined) {
    const email = req.body.email;
    DbServer.setConf(camerasArr[0], eyes, phone, yawning, yawningAlert, email)
      .then(response => res.send(response)).catch(err => {
        console.log("error occurred: ", err.message)
        res.status(400).send("ERROR_CODE");
      });
  }


  DbServer.setConfOfArrCamera(camerasArr, eyes, phone, yawning, yawningAlert)
    .then(response => res.send(response)).catch(err => {
      console.log("error occurred: ", err.message)
      res.status(400).send("ERROR_CODE");
    });
});

router.post('/getConf', async function (req, res) {
  const cameraId = req.body.cameraId;
  console.log(cameraId);

  DbServer.getConf(cameraId)
    .then(response => res.send(response)).catch(err => {
      console.log("error occurred: ", err.message)
      res.status(400).send("ERROR_CODE");
    });
});


router.post('/getEmail', async function (req, res) {
  const cameraId = req.body.cameraId;
  console.log("getEmail", cameraId);

  DbServer.getMail(cameraId).then((response) => {
    res.send(JSON.stringify(response));
  })
    .catch(err => {
      console.log("error occurred: ", err.message)
      res.status(400).send("ERROR_CODE");
    });
});


router.post('/setEmail', async function (req, res) {
  const cameraId = req.body.cameraId;
  const newEmail = req.body.email;
  console.log("setEmail cameraId", cameraId);
  console.log("setEmail newEmail", newEmail);

  DbServer.setMail(cameraId, newEmail)
    .then(() => res.send(true)).catch((err) => {
      console.log("setEmail: ", err.message);
      res.send(false)
    }).catch(err => {
      console.log("error occurred: ", err.message)
      res.status(400).send("ERROR_CODE");
    });

});




module.exports = router


