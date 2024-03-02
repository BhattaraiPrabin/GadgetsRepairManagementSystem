const express = require("express");
const router = express.Router();
const Issue = require("../models/issue");
const Gadget = require("../models/gadget");
const User = require("../models/user");
const GadgetDetails = require("../models/gadgetDetails");
const emailController = require("../controllers/emailController");


// Create a new issue
module.exports = {
    async registerIssue(req, res, next) {
        const gadgetId = req.body.gadgetId; //params
        // const staffId = req.staff._id; //token
        const staffId = "65b903cbf3020e9e0818e1a0";

        try {
            const {
                type,
                description,
                priority,
                repairStatus,
                techNote,

            } = req.body;

            // Create a new issue
            const newIssue = new Issue({
                type,
                description,
                priority,
                repairStatus,
                techNote,
                gadgetId,
                staffId,
            });

            // Save the new issue
            const savedIssue = await newIssue.save();

            console.log({ savedIssue })

            // Check if the repairStatus is "openCase"
            if (repairStatus === "openCase") {
                // Send email about gadget registration
                const subject = "Your Gadget Registration";
                const text = `Thank you for registering your gadget. Your issue with ID ${savedIssue._id} has been opened. Our team will review the details and update you on the progress. Thank you for choosing our service.`;

                // Find the associated gadget to get user information
                const gadget = await Gadget.findById(savedIssue.gadgetsId).populate(
                    "userId"
                );

                if (gadget) {
                    // Customize the email content with the user details
                    await emailController.sendNewCaseOpenedEmail(
                        gadget.userId.email,
                        savedIssue._id
                    );
                }
            }

            res.status(201).json(savedIssue);
        } catch (error) {
            next(error);
        }
    },

    // Get all issues
    async getAllIssue(req, res) {
        try {
            const issues = await Issue.find();
            res.status(200).json(issues);
        } catch (error) {
            next(error);
        }
    },

    // Get issue by ID
    async getIssueById(req, res, next) {
        try {
            const issue = await Issue.findById(req.params.id);
            if (!issue) {
                return res.status(404).json({ error: "Issue not found" });
            }
            res.status(200).json(issue);
        } catch (error) {
            next(error);
        }
    },

    // Update issue by ID
    // async updateIssue(req, res, next) {
    //     try {
    //         const { repairStatus, review, rating } = req.body;
    //         const updatedIssue = await Issue.findByIdAndUpdate(
    //             req.params.id, { repairStatus, review, rating }, { new: true }
    //         );

    //         if (!updatedIssue) {
    //             return res.status(404).json({ error: "Issue not found" });
    //         }

    //         // Handle different status changes and send corresponding emails
    //         switch (repairStatus) {
    //             case "openCase":
    //                 const gadget = await Gadget.findById(updatedIssue.gadgetId).populate("userId");

    //                 if (gadget) {
    //                     emailController.sendNewCaseOpenedEmail(gadget.userId.email, updatedIssue._id);
    //                 }
    //                 break;
    //             case "readyToClose":
    //                 const readyToCloseGadget = await Gadget.findById(updatedIssue.gadgetId).populate("userId");

    //                 if (readyToCloseGadget) {
    //                     emailController.sendReadyToCloseEmail(readyToCloseGadget.userId.email, updatedIssue._id);
    //                 }
    //                 break;
    //             case "closed":
    //                 const closedGadget = await Gadget.findById(updatedIssue.gadgetId).populate("userId");

    //                 if (closedGadget) {
    //                     emailController.sendClosedEmail(closedGadget.userId.email, updatedIssue._id);
    //                     emailController.sendFeedbackRequestEmail(closedGadget.userId.email, updatedIssue._id);
    //                 }
    //                 break;
    //             // Add more cases for other status changes if needed

    //             default:
    //                 break;
    //         }

    //         res.status(200).json(updatedIssue);
    //     } catch (error) {
    //         next(error);
    //     }
    // },
    // try



    // async updateIssue(req, res, next) {
    //     try {
    //         console.log("Received POST request to update issue:", req.body);
    //         console.log("Issue ID from params:", req.params.id);

    //         const { repairStatus, review, rating, payment } = req.body;
    //         const updatedIssue = await Issue.findByIdAndUpdate(
    //             req.params.id, { repairStatus, review, rating, payment }, { new: true }
    //         );

    //         if (!updatedIssue) {
    //             console.log("Issue not found");
    //             return res.status(404).json({ error: "Issue not found" });
    //         }

    //         console.log("Issue updated successfully");
    //         const gadget = await Gadget.findById(updatedIssue.gadgetId).populate("userId");

    //         switch (repairStatus) {
    //             case "openCase":
    //                 const gadget = await Gadget.findById(updatedIssue.gadgetId).populate("userId");

    //                 if (gadget) {
    //                     console.log("Sending new case opened email");
    //                     emailController.sendNewCaseOpenedEmail(gadget.userId.email, gadget.userId.fullName,updatedIssue._id);
    //                 }
    //                 break;
    //             case "readyToClose":
    //                 const readyToCloseGadget = await Gadget.findById(updatedIssue.gadgetId).populate("userId");

    //                 if (readyToCloseGadget) {
    //                     console.log("Sending ready to close email");
    //                     emailController.sendReadyToCloseEmail(readyToCloseGadget.userId.email,gadget.userId.fullName, updatedIssue._id);
    //                 }
    //                 break;
    //             case "closed":
    //                 const closedGadget = await Gadget.findById(updatedIssue.gadgetId).populate("userId");

    //                 if (closedGadget) {
    //                     console.log("Sending closed and feedback request emails");
    //                     emailController.sendClosedEmail(closedGadget.userId.email, updatedIssue._id);
    //                     emailController.sendFeedbackRequestEmail(closedGadget.userId.email,gadget.userId.fullName, updatedIssue._id);
    //                 }
    //                 break;

    //             default:
    //                 break;
    //         }

    //         console.log("Sending response to client");
    //         res.status(200).json(updatedIssue);
    //     } catch (error) {
    //         console.error("Error occurred:", error);
    //         next(error);
    //     }
    // },
    async updateIssue(req, res, next) {
        try {
            console.log("Received POST request to update issue:", req.body);
            console.log("Issue ID from params:", req.params.id);

            const { repairStatus, review, rating, payment } = req.body;
            const updatedIssue = await Issue.findByIdAndUpdate(
                req.params.id, { repairStatus, review, rating, payment }, { new: true }
            );

            if (!updatedIssue) {
                console.log("Issue not found");
                return res.status(404).json({ error: "Issue not found" });
            }

            console.log("Issue updated successfully");

            // Common code to fetch gadget information
            const gadget = await Gadget.findById(updatedIssue.gadgetId).populate("userId");

            // Handle different status changes and send corresponding emails
            switch (repairStatus) {
                case "openCase":
                    console.log("Sending new case opened email");
                    emailController.sendNewCaseOpenedEmail(gadget.userId.email, gadget.userId.fullName, updatedIssue._id);
                    break;
                case "readyToClose":
                    console.log("Sending ready to close email");
                    emailController.sendReadyToCloseEmail(gadget.userId.email, gadget.userId.fullName, updatedIssue._id);
                    break;
                case "closed":
                    console.log("Sending closed and feedback request emails");
                    emailController.sendClosedEmail(gadget.userId.email, updatedIssue._id);
                    emailController.sendFeedbackRequestEmail(gadget.userId.email, gadget.userId.fullName, updatedIssue._id);
                    break;
                // Add more cases for other status changes if needed

                default:
                    break;
            }

            console.log("Sending response to client");
            res.status(200).json(updatedIssue);
        } catch (error) {
            console.error("Error occurred:", error);
            next(error);
        }
    },



    async function(req, res, next) {
        try {
            const issues = await Issue.find();

            if (!issues || issues.length === 0) {
                return res.status(404).json({ message: 'No issues found' });
            }

            const allIssueDetails = [];

            for (const issue of issues) {
                try {
                    const gadget = await Gadget.findById(issue.gadgetId);

                    if (!gadget) {
                        console.warn(`Gadget not found for issue with ID ${issue.id}`);
                        continue;
                    }

                    const user = await User.findById(gadget.userId);

                    if (!user) {
                        console.warn(`User not found for gadget with ID ${gadget.id}`);
                        continue;
                    }

                    const issueDetails = {
                        user: {
                            fullName: user.fullName,
                            contact: user.contact,
                            email: user.email,
                            address: user.address,
                            userType: user.userType,
                        },
                        gadget: {
                            details: gadget.details,
                            brand: gadget.brand,
                            model: gadget.model,
                            serialNo: gadget.serialNo,
                        },
                        issue: {
                            description: issue.description,
                            priority: issue.priority,
                            repairStatus: issue.repairStatus,
                            issueId: issue._id
                        },
                    };

                    allIssueDetails.push(issueDetails);
                } catch (detailsError) {
                    console.error('Error fetching details for issue:', detailsError);
                }
            }

            res.json(allIssueDetails);
        } catch (error) {
            console.error('Error fetching issues:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    ,




    // Delete issue by ID
    async deleteIssue(req, res, next) {
        try {
            const deletedIssue = await Issue.findByIdAndDelete(req.params.id);
            if (!deletedIssue) {
                return res.status(404).json({ error: "Issue not found" });
            }
            res.status(204).json();
        } catch (error) {
            next(error);
        }
    },


};