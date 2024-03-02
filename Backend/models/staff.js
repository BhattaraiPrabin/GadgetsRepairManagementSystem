const mongoose = require("mongoose");
const Gadget = require("./gadget");
var uniqueValidator = require("mongoose-unique-validator");

const staffSchema = new mongoose.Schema({
  staffName: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  staffType: {
    type: String,
    required: true,
    enum: ["admin", "staff"],
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  picture: {
    type: String,
  },
  gadgets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gadget",
    },
  ],
});
staffSchema.plugin(uniqueValidator);
const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
