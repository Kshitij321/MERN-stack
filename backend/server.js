const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors');
const userRoutes =require('./routes/userRoutes');


require("dotenv").config();
const workoutroutes = require("./routes/workouts");
const app = express();






app.use(cors());


//middleware, parses the incoming JSON data and put it in req.body
//to be available for route handlers
app.use(express.json());

//middleware
app.use("/api/workouts", workoutroutes);
app.use("/api/user",userRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listening to port
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening to", process.env.PORT);
    });
  })
  .catch(() => {
    console.log("error from mongo");
  })
  ;
