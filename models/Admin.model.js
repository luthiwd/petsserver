const { Schema, model } = require ("mongoose")

const adminSchema = new Schema (
  {
    name: String,
    email: String,
    password: String,
    admin: {
      type: Boolean,
      default: true
    }
  }
);

const Admin = model("Admin", adminSchema)

module.exports = Admin;