const express = require("express");
const router = express.Router();
const Gadget = require("../models/gadget");
const User = require("../models/user");

// Create a new gadget
module.exports = {
    async gadgetCreate(req, res, next) {
        try {
            const userId = req.body.userId;
            // Fetch the latest gadget from the database to get the last gadgetId
            // console.log(req.staff);
            // const staff = req.staff._id;
            // if (req.staff === null) {
            //     res.status(400).send("Invalid Staff");
            // }

            const lastGadget = await Gadget.findOne({}, {},

                { sort: { gadgetId: -1 } }
            );
            console.log(lastGadget);

            let lastGadgetId = 99; // Default starting value if no gadgets are present
            if (lastGadget) {
                lastGadgetId = Number(lastGadget.gadgetId) + 1;
            }
            const {
                category,
                details,
                brand,
                model,
                serialNo,
                serviceTag,
                emiNo,
                warranty,
            } = req.body;

            console.log(req.body)
            const staffId = "65b903cbf3020e9e0818e1a0";

            const gadget = new Gadget({
                category,
                details,
                brand,
                model,
                serialNo,
                serviceTag,
                emiNo,
                gadgetId: lastGadgetId,
                warranty,
                staffId: staffId,
                userId: userId,
            });

            console.log({ gadget })

            const savedGadget = await gadget.save();

            res.status(201).json(savedGadget);
        } catch (error) {
            console.log({ error })
            res.status(400).json({ error: error.message });
        }
    },

    // Get all gadgets
    async getAllGadget(req, res) {
        try {
            const gadgets = await Gadget.find();
            res.status(200).json(gadgets);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    //get gadget details by id
    async getGadgetDetailsById(req, res) {
        try {
            const gadgetId = req.params.gadgetid;
            const gadget = await Gadget.findOne({ gadgetId: gadgetId }).exec();

            if (!gadget) {
                return res.status(404).json({ error: "Gadget not found" });
            }

            res.status(200).json(gadget);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get gadget by ID
    async getGadgetById(req, res) {
        try {
            const id = req.params.id;
            const gadget = await Gadget.findById(id).exec();
            if (!gadget) {
                return res.status(404).json({ error: "Gadget not found" });
            }
            res.status(200).json(gadget);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update gadget by ID
    async updateGadget(req, res) {
        try {
            const updatedGadget = await Gadget.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true }
            );
            if (!updatedGadget) {
                return res.status(404).json({ error: "Gadget not found" });
            }
            res.status(200).json(updatedGadget);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete gadget by ID
    async deleteGadget(req, res) {
        try {
            const deletedGadget = await Gadget.findByIdAndDelete(req.params.id);
            if (!deletedGadget) {
                return res.status(404).json({ error: "Gadget not found" });
            }
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};