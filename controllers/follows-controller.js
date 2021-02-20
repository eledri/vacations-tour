const express = require("express");
const followsLogic = require("../business-logic-layer/follows-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");
const path = require("path");

const router = express.Router();

// get all follows by userId
router.get("/:userId", verifyLoggedIn, async (request, response) => {
  try {
    const userId = +request.params.userId;
    const follows = await followsLogic.getAllFollowsAsync(userId);
    response.json(follows);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// add new follow
router.post("/add-follow", verifyLoggedIn, async (request, response) => {
  try {
    const follow = request.body;
    const addedFollow = await followsLogic.addFollowAsync(follow);
    response.status(201).send(addedFollow);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

// delete follow
router.delete(
  "/:userId/:vacationId",
  verifyLoggedIn,
  async (request, response) => {
    try {
      const vacationId = +request.params.vacationId;
      const userId = +request.params.userId;
      await followsLogic.deleteVacatioFollow(userId, vacationId);
      response.sendStatus(204);
    } catch (err) {
      response.status(500).send(err.message);
    }
  }
);

module.exports = router;
