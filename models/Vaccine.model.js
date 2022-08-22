const { Schema, model } = require("mongoose")

const vaccineSchema = new Schema(
  {
    name: String,
    remember: Number,
  },
  {
    timestamps: true,
  }
);

const Vaccine = model ("Vaccine", vaccineSchema);

module.exports = Vaccine;