const { Schema, model } = require ("mongoose")

const adminSchema = new Schema (
  {
    name: String,
    email: String,
    password: String,
  }
);

const Admin = model("Admin", adminSchema)

module.exports = Admin;