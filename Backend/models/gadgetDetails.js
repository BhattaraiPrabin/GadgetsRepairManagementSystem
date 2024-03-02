const mongoose = require("mongoose");
const Gadget = require("./gadget");
const Issue = require("./issue");

const gadgetDetailsSchema = new mongoose.Schema({
    mouse: {
        type: Boolean,
    },
    ram: {
        type: String,
    },
    ssd: {
        type: String,
    },
    hdd: {
        type: String,
    },
    charger: {
        type: String,
    },
    gadgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gadget",
    },
    other: {
        type: String,
    },
    issueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
    },
});

const GadgetDetails = mongoose.model("GadgetDetails", gadgetDetailsSchema);

module.exports = GadgetDetails;