const mongoose = require("mongoose");
const Issue = require("./issue");
const User = require("./user");
var uniqueValidator = require("mongoose-unique-validator");
// const autoIncrement = require("mongoose-auto-increment");

const paymentSchema = new mongoose.Schema({
  // paymentId: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  //   // index: true,
  //   // autoIncrement: true,
  // },
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issue",
  },
  amountPaid: {
    type: Number,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentType: {
    type: String,
    enum: ["esewa", "khalti", "cod"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// paymentSchema.plugin(autoIncrement.plugin, {
//   model: "Payment",
//   field: "paymentId",
//   startAt: 100,
// });
paymentSchema.plugin(uniqueValidator);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
