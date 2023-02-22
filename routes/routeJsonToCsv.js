const express = require('express')
const router = express.Router()


const JsonToCsv = require('../models/modelJsonToCsv');

router.post('/saveOneTravelToCsv', async function (req, res) {
    const cameraId = req.body.cameraId;
    const travelId = req.body.travelId;
    console.log("in saveOneTravelToCsv", cameraId, travelId)

    JsonToCsv.saveOneTravelToCsv(cameraId, travelId)
        .then((response) => {
            res.download(process.cwd() + "/" + response, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    JsonToCsv.deleteFile(false, cameraId, travelId);
                }
            });
        });


});


router.post('/saveALLTravelToCsv', async function (req, res) {
    const cameraId = req.body.cameraId;
    const travelArrId = req.body.travelArrId;
    console.log("in routeJsonTocSV", cameraId, travelArrId)


    JsonToCsv.saveALLTravelToCsv(cameraId, travelArrId)
        .then((response) => {
            res.download(process.cwd() + "/" + response, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    JsonToCsv.deleteFile(true, cameraId, travelArrId);
                }
            });
        });
});

module.exports = router
