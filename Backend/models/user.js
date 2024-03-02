const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const Gadget = require("./gadget");
const Payment = require("./payment");

const userSchema = new mongoose.Schema({
  fullName: {
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
    unique: true,
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
  userType: {
    type: String,
    required: true,
    enum: ["company", "customer"],
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
  subscriptionStatus: {
    hasSubscription: {
      type: Boolean,
    },
    type: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  picture: {
    type: String,
  },
  reward: {
    type: Number,
    default: 100,
    required: true,
  },
  gadgets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gadget",
    },
  ],
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ]
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);
module.exports = User;
