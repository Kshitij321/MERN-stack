const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors');
const userRoutes =require('./routes/userRoutes');


require("dotenv").config();
const workoutroutes = require("./routes/workouts");
const app = express();

app.options('*', cors());





app.use(cors());
const port = process.env.PORT || 4000;

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
    app.listen(port, () => {
      console.log("connected to db & listening to", port);
    });
  })
  .catch(() => {
    console.log("error from mongo");
  })
  ;
