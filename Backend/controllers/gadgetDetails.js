const express = require("express");
const router = express.Router();
const GadgetDetails = require("../models/gadgetDetails");
const Gadget = require("../models/gadget");

module.exports = {
    // Create new gadget details
    async createDetails(req, res) {
        try {
            const { mouse, ram, ssd, hdd, charger, other } = req.body;
            const gadgetid = req.body.gadgetId;

            console.log(req.body)

            // Check if the gadget with the specified ID exists
            const gadget = await Gadget.findOne({ _id: gadgetid }).exec();
            console.log({ gadget })
            if (!gadget) {
                return res.status(404).json({ error: "Gadget not found" });
            }

            // Create a new gadget details entry
            const newGadgetDetails = new GadgetDetails({
                gadgetId: gadgetid,
                mouse,
                ram,
                ssd,
                hdd,
                charger,
                other,
            });

            const savedGadgetDetails = await newGadgetDetails.save();
            console.log({ savedGadgetDetails })

            res.status(201).json(savedGadgetDetails);
        } catch (error) {
            console.log({ error })
            res.status(400).json({ error: error.message });
        }
    },

    // Get all gadget details
    async getAllGadgetDetails(req, res) {
        try {
            const gadgetDetails = await GadgetDetails.find();
            res.status(200).json(gadgetDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get gadget details by ID
    async getGadgetDetailsById(req, res) {
        try {
            const gadgetDetails = await GadgetDetails.findById(req.params.id);
            if (!gadgetDetails) {
                return res.status(404).json({ error: "Gadget details not found" });
            }
            res.status(200).json(gadgetDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update gadget details by ID
    async updateGadgetDetailsById(req, res) {
        try {
            const updatedGadgetDetails = await GadgetDetails.findByIdAndUpdate(
                req.params.id,
                req.body, { new: true }
            );
            if (!updatedGadgetDetails) {
                return res.status(404).json({ error: "Gadget details not found" });
            }
            res.status(200).json(updatedGadgetDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete gadget details by ID
    async deleteGadgetDetailsById(req, res) {
        try {
            const deletedGadgetDetails = await GadgetDetails.findByIdAndDelete(
                req.params.id
            );
            if (!deletedGadgetDetails) {
                return res.status(404).json({ error: "Gadget details not found" });
            }
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

// // Get all gadget details

// router.get("/", async(req, res) => {
//     try {
//         const gadgetDetails = await GadgetDetails.find();
//         res.status(200).json(gadgetDetails);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Get gadget details by ID
// router.get("/:id", async(req, res) => {
//     try {
//         const gadgetDetails = await GadgetDetails.findById(req.params.id);
//         if (!gadgetDetails) {
//             return res.status(404).json({ error: "Gadget details not found" });
//         }
//         res.status(200).json(gadgetDetails);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update gadget details by ID
// router.put("/:id", async(req, res) => {
//     try {
//         const updatedGadgetDetails = await GadgetDetails.findByIdAndUpdate(
//             req.params.id,
//             req.body, { new: true }
//         );
//         if (!updatedGadgetDetails) {
//             return res.status(404).json({ error: "Gadget details not found" });
//         }
//         res.status(200).json(updatedGadgetDetails);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Delete gadget details by ID
// router.delete("/:id", async(req, res) => {
//     try {
//         const deletedGadgetDetails = await GadgetDetails.findByIdAndDelete(
//             req.params.id
//         );
//         if (!deletedGadgetDetails) {
//             return res.status(404).json({ error: "Gadget details not found" });
//         }
//         res.status(204).json();
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });