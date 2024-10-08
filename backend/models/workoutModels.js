const mongoose = require("mongoose");

const schema = mongoose.Schema;

const workoutschema = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },

    reps: {
      type: Number,
      required: true,
    },
    user_id:{
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("workout", workoutschema);
