const router = require("express").Router();
const staffController = require("../controllers/staff");
const userController = require("../controllers/user");
const gadgetDetailController = require("../controllers/gadgetDetails.js");
const staffLoginController = require("../controllers/staffLogin");
const userLoginController = require("../controllers/userLogin.js");
const gadgetController = require("../controllers/gadget");
const issueController = require("../controllers/issue.js");
const paymentController = require("../controllers/payment.js");
const userService = require('../controllers/userService.js');
const getAllIssues = require('../controllers/issuesWorkOrder.js');

const middleware = require("../middleware/index.js");
const emailController = require("../controllers/emailController.js");
const paymentList = require("../controllers/paymentList.js")

/*---------------------------------------------------------------


ROUTER FOR STAFF - START FROM HERE ....

---------------------------------------------------------------*/

router.get("/api/staff", staffController.stafflist);
router.post("/api/staff", staffController.registerStaff);
router.get("/api/staff/:id", staffController.getStaff);
router.put("/api/staff/:id", staffController.updateStaff);
router.delete("/api/staff/:id", staffController.deleteStaff);
/*---------------------------------------------------------------


ROUTER FOR USER - START FORM HERE ..... 

---------------------------------------------------------------*/
router.get("/api/user", userController.userList);
router.post(
    "/api/user",
    // middleware.tokenExtractor,
    // middleware.staffExtractor,
    userController.registerUser
);
router.get("/api/user/:id", userController.getUser);

router.put(
    "/api/user/:id",
    // middleware.tokenExtractor,
    // middleware.staffExtractor,
    userController.updateUser
);
router.delete("/api/user/:id", userController.deleteUser);

/*---------------------------------------------------------------




---------------------------------------------------------------*/

router.post("/api/stafflogin", staffLoginController.staffLogin);
router.post("/api/userlogin", userLoginController.userLogin);

/*---------------------------------------------------------------


ROUTER FOR GADGETS - START FROM HERE.. 

---------------------------------------------------------------*/

router.post(
    "/api/gadget/",
    // middleware.tokenExtractor,
    // middleware.staffExtractor,
    gadgetController.gadgetCreate
);
router.get("/api/gadget", gadgetController.getAllGadget);
router.get("/api/gadget/:id", gadgetController.getGadgetById);
router.get("/api/g/:gadgetid", gadgetController.getGadgetDetailsById);
router.put(
    "/api/gadget/:id",
    middleware.tokenExtractor,
    middleware.staffExtractor,
    gadgetController.updateGadget
);
router.delete("/api/gadget/:id", gadgetController.deleteGadget);

router.get("/api/gadgetdetails", gadgetDetailController.getAllGadgetDetails);
router.post(
    "/api/gadgetdetails",
    // middleware.tokenExtractor,
    // middleware.staffExtractor,
    gadgetDetailController.createDetails
);
router.get("/api/gadgetdetails/:id", gadgetDetailController.deleteGadgetDetailsById);
router.put(
    "/api/gadgetdetails/:id",
    gadgetDetailController.updateGadgetDetailsById
);
router.delete(
    "/api/gadgetdetails/:id",
    gadgetDetailController.deleteGadgetDetailsById
);


router.get("/api/issue", issueController.getAllIssue);
router.post(
    "/api/issue",
    // middleware.tokenExtractor,
    // middleware.staffExtractor,
    issueController.registerIssue
);
router.get("/api/issue/:id", issueController.getIssueById);
router.put(
    "/api/issue/:id",
    // middleware.tokenExtractor,
    // middleware.staffExtractor,
    issueController.updateIssue
);
router.delete(
    "/api/issue/:id",
    middleware.tokenExtractor,
    middleware.staffExtractor,
    issueController.deleteIssue
);

router.post("/api/payments/:issueId", paymentController.newPayment);
router.get("/api/payments", paymentController.getAllPayment);
router.get("/api/payments/:id", paymentController.getPaymentById);
router.put("/api/payments/:id", paymentController.updatePayment);
router.delete("/api/payments/:id", paymentController.deletePayment);

router.post("/api/open-email", emailController.sendNewCaseOpenedEmail);
router.post("/api/ready-email", emailController.sendReadyToCloseEmail);
router.post("/api/closed-email", emailController.sendClosedEmail);



// ========================================================================










router.get('/api/issue/details', async (req, res) => {
    try {
        const results = await issueController.getAllIssueDetails();
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get('/api/issues', getAllIssues.getAllIssues);
router.get('/api/paymentlist', paymentList.getAllPaymentList);
// router.post("/api/userlogin", userLoginController.userLogin);











module.exports = router;