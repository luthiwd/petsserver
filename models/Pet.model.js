const { Schema, model } = require ("mongoose");

const petSchema = new Schema (
  {
    name: String,
    breed: String,
    birthday: Number,
    chip: Number,
    image: {
      type: String,
      default: "https://res.cloudinary.com/djersm2h6/image/upload/v1661182937/petsdiary/cat-dog_vqwnxs.png"
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref : "Owner"
    },
    visit: [{
      type: Schema.Types.ObjectId,
      ref : "Visit"
    }],
    vaccine: [{
      type: Schema.Types.ObjectId,
      ref: "Vaccine"
    }],
    worming: [{
      type: Schema.Types.ObjectId,
      ref: "Worming"
    }],

  }
);

const Pet = model("Pet", petSchema );

module.exports = Pet;