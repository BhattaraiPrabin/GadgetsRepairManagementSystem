const mongoose = require("mongoose");
const Gadget = require("./gadget");
const Staff = require("./staff");

const issueSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["hardware", "software", "other"],
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
    },
    repairStatus: {
        type: String,
        required: true,
        enum: ["registered", "openCase", "progress", "readyToClose", "closed"],
    },

    gadgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gadget",
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
    },
    assignedDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    issueAmount: {
        type: Number,
    },
    progress: [{
        date: {
            type: Date,
            required: true,
        },
        note: {
            type: String,
        },
    },],
    review: {
        type: String,
    },
    rating: {
        type: Number,
    },
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;