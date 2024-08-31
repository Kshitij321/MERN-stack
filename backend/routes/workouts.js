const express = require("express");
const router = express.Router();
const requieAuth=require("../middlewares/requireAuth");
const {
  deleteWorkout,
  updateWorkout,
  getWorkout,
  getWorkouts,
  createNewWorkout,
} = require("../controllers/workoutController");
// to check authorisation before accessing any route
router.use(requieAuth);

router.get("/", getWorkouts);

router.post("/", createNewWorkout);

router.delete("/:id", deleteWorkout);

router.get("/:id", getWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
