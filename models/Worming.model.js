const { Schema, model } = require("mongoose");

const wormingSchema = new Schema(
  {
    name: String,
    remember: Number,
  },
  { 
    timestamps: true,
  }
);

const Worming = model("Worming", wormingSchema)

module.exports = Worming;