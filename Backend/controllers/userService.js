

// issueController.js
const Issue = require('../models/issue'); // Import your Issue model
const Gadget = require('../models/gadget'); // Import your Gadget model
const User = require('../models/gadget'); // Import your User model

const fetchDetailsForIssue = async (issueId) => {
    try {
        const issue = await Issue.findById(issueId)
            .populate('gadgetId', 'details brand model serialNo') // Populate the gadget details
            .populate({
                path: 'gadgetId',
                populate: {
                    path: 'userId',
                    model: 'User',
                    select: 'fullName contact email address userType',
                },
            }); // Populate the user details

        if (!issue) {
            return { message: 'Issue not found for ID: ' + issueId };
        }

        const user = issue.gadgetId.userId;

        return {
            issueId: issue._id,
            user: {
                fullName: user.fullName,
                contact: user.contact,
                email: user.email,
                address: user.address,
                userType: user.userType,
            },
            gadget: {
                details: issue.gadgetId.details,
                brand: issue.gadgetId.brand,
                model: issue.gadgetId.model,
                serialNo: issue.gadgetId.serialNo,
            },
            issue: {
                description: issue.description,
                priority: issue.priority,
                repairStatus: issue.repairStatus,
                issueId: issue._id,
            },
        };
    } catch (error) {
        console.error('Error:', error);
        return { message: 'Internal server error for ID: ' + issueId };
    }
};

const getAllIssueDetails = async () => {
    try {
        const issues = await Issue.find(); // Fetch all issues

        // Fetch details for each issue
        const results = await Promise.all(issues.map(async issue => {
            const issueId = issue._id;
            const issueDetails = await fetchDetailsForIssue(issueId);
            return { issueId, issueDetails };
        }));

        return results;
    } catch (error) {
        console.error('Error fetching issue details:', error);
        throw error; // Propagate the error for the calling code to handle
    }
};

module.exports = {
    getAllIssueDetails,
};
