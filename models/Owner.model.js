const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const ownerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true 
    },
    password:{ 
      type: String,
      required: true,
    },
    name: String,
    surname: String,
    dni: { 
      type: String,
      required: true,
      unique: true,
    },
    email: { 
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/djersm2h6/image/upload/v1661181085/petsdiary/avatar_zusyq9.png"
    },
    pets: [{
      type: Schema.Types.ObjectId,
      ref: "Pet"      
    }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Owner = model("Owner", ownerSchema);

module.exports = Owner;
