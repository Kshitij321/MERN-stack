const mongoose = require("mongoose");
const workout = require("../models/workoutModels");

// Assuming this is the correct model




const getWorkouts = async (req, res) => {
  try {
    const user_id=req.user._id;
    const work = await workout.find({user_id}).sort({ createdAt: -1 });
    return res.status(200).json(work);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};





const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "NO workouts found" });
  }

  try {
    const work = await workout.findById(id);
    if (!work) {
      return res.status(404).json({ error: "NO workouts found" });
    }
    res.status(200).json(work);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};







const createNewWorkout = async (req, res) => {
 
  const { title, load, reps } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill in all the fields", emptyFields });
  }
  try {                      
    const user_id =req.user._id;
    const work = await workout.create({ title, load, reps,user_id }); 
    return res.status(200).json(work);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};






const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "NO workouts found with that id" });
  }
  const work = await workout.findOneAndDelete({ _id: id });
  if (!work) {
    return res.status(404).json({ error: "No such workouts" });
  }
  return res.status(200).json(work);
};





const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, load, reps } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "NO workouts found" });
  }
  const work = await workout.findByIdAndUpdate(
    { _id: id },
    { title, load, reps }
  );
  if (!work) {
    return res.status(404).json({ error: "No such workouts" });
  }
  return res.status(200).json(work);
};



module.exports = {
  deleteWorkout,
  updateWorkout,
  getWorkout,
  getWorkouts,
  createNewWorkout,
};
