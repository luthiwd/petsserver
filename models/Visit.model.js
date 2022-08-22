const { Schema, model } = require("mongoose");

const visitSchema = new Schema(
  {
    title: String,
    comment: String,
    treatment: String,
  },
  {
    timestamps: true,
  }
);

const Visit = model("Visit", visitSchema);

module.exports = Visit;