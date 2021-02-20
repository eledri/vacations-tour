const express = require("express");
const vacationsLogic = require("../business-logic-layer/vacations-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in")
const verifyAdmin = require("../middleware/verify-admin")
const path = require('path');
const socketHelper = require("../helpers/socket-helper")


const router = express.Router();

//get all vacations
router.get("/",verifyLoggedIn, async (request, response) => {
  try {
    const vacations = await vacationsLogic.getAllVacationsAsync();
    response.json(vacations);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// add new vacation
router.post("/",verifyAdmin, async (request, response) => {
  try {
    const vacation = request.body;
    const addedVacation = await vacationsLogic.addVacationAsync(vacation, request.files ? request.files.image : null);
    response.status(201).send(addedVacation);
    socketHelper.VacationAdded(addedVacation)

  } catch (err) {
    response.status(500).send(err.message);
  }

});
//delete vacation
router.delete("/:id",verifyAdmin, async (request, response) => {
    try {
        const id = +request.params.id;
        await vacationsLogic.deleteVacation(id);
        socketHelper.VacationDeleted(id)
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

//update full vacation
router.put("/:vacationId",verifyAdmin, async (request, response) => {
    try {
        const vacation = request.body;
        vacation.vacationId = +request.params.vacationId;
        const updatedVacation =  await vacationsLogic.updateFullVacation(vacation,request.files ? request.files.image : null);
        if(!updatedVacation) {
            response.status(404).send(`id ${vacation.vacationId} not found.`);
            return;
        }
        socketHelper.VacationUpdated(updatedVacation)
        response.json(updatedVacation);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


 router.get("/images/:ImageFileName", (request, response) => {
        const ImageFileName = request.params.ImageFileName;
        let reqPath = path.join(__dirname, '../')
        response.sendFile( reqPath + "/images/" + ImageFileName );
    });


module.exports = router;
