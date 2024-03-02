const mongoose = require("mongoose");
const User = require("./user");
const Staff = require("./staff");
var uniqueValidator = require("mongoose-unique-validator");

const gadgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["laptop", "computer", "printer", "motherboard", "other"],
  },
  details: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  serialNo: {
    type: String,
  },
  serviceTag: {
    type: String,
  },
  emiNo: {
    type: String,
  },
  gadgetId: {
    type: Number,
    required: true,
    unique: true,
  },
  gadgetDetailsid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GadgetDetails",
  },
  warranty: {
    type: {
      hasWarranty: {
        type: Boolean,
      },
      duration: {
        type: String,
      },
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
  },
});
gadgetSchema.plugin(uniqueValidator);

const Gadget = mongoose.model("Gadget", gadgetSchema);

module.exports = Gadget;
