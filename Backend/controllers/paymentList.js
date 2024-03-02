const express = require("express");
const router = express.Router();
const Issue = require("../models/issue");
const Gadget = require("../models/gadget");
const User = require("../models/user");
const Payment = require("../models/payment")
const GadgetDetails = require("../models/gadgetDetails");
const emailController = require("../controllers/emailController");

module.exports = {
    async getAllPaymentList(req, res, next) {
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

                    const payment = await Payment.find({ issueId: issue._id });
                    console.log({ payment })

                    const issueDetails = {
                        user: {
                            fullName: user.fullName,
                            contact: user.contact,
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
                            issueId: issue._id,
                        },
                        payment: {
                            amountPaid: payment.amountPaid,
                            paymentType: payment.paymentType,
                        }
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
}


