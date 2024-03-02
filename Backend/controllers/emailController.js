const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const emailService = {
  async sendEmail(userEmail, subject, text) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: subject,
      text: text,
    });
  },
};

// module.exports = {
//   async sendNewCaseOpenedEmail(userEmail, fullName, issueId) {
//     const subject = "Maintenance Registration Confirmed: Your Case is Now Open!";




//     const text = `Hello ${fullName} Ji, 

//   Namaskar! 

//   We're delighted to inform you that a new repair case has been opened for your gadget. The assigned case ID is ${issueId} has been opened for your gadget. Our team will review the details and update you on the progress. Thank you for choosing our service.

//   Thank you for choosing GRMS-NEPAL for your gadget repair needs. We assure you of our prompt and reliable service.

//   Best Regards,
//   GRMS-NEPAL, Support Team

//     `;

//     await emailService.sendEmail(userEmail, subject, text);
//   },

//   async sendReadyToCloseEmail(userEmail, fullName, issueId) {
//     const subject = "Your Gadget Repair is Ready for Pickup";
//     const text = `Hello ${fullName} Ji,

//     We're pleased to inform you that your gadget repair with ID ${issueId} is now complete and ready for pickup. 
//     Please review the details and feel free to provide any feedback.
//     Thank you for choosing our service. We appreciate your trust in us.
//     Best Regards,
//     GRMS-NEPAL, Support Team
//     `;

//     await emailService.sendEmail(userEmail, subject, text);
//   },

//   async sendClosedEmail(userEmail, fullName, issueId) {
//     const subject = "Gadget Repair Completed: Your Device is Ready!";
//     const text = `
//     Dear ${fullName} Ji,
//     We are thrilled to inform you that your gadget repair with ID ${issueId} has been successfully completed. Your device is now ready for pickup.
//     Please visit our service center at your earliest convenience to collect your repaired gadget. 

//     If you have any questions or concerns, feel free to reach out to our support team.
//     We appreciate your trust in our service and hope your gadget now functions perfectly. 

//     Thank you for choosing GRMS-NEPAL.
//     Best Regards, 
//     GRMS-NEPAL, Support Team
//     `;

//     await emailService.sendEmail(userEmail, subject, text);
//   },

//   async sendFeedbackRequestEmail(userEmail, fullName, issueId) {
//     const subject = "Your Feedback Matters: Gadget Repair Assessment";
//     const text = `Dear ${fullName} Ji,
//     We hope this message finds you well. Your repaired gadget with ID ${issueId} has been in your possession for some time, and we value your opinion on its condition and the overall repair experience.
//     Your feedback is crucial in our ongoing efforts to enhance our services. 

//     Kindly take a moment to share your thoughts to our social media.
//     If you have any specific comments or concerns, feel free to include them in your response. We genuinely appreciate your time and input.

//     Thank you for choosing GRMS-NEPAL. We look forward to hearing from you!
//     Best Regards, 
//     GRMS-NEPAL, Support Team
//     `;

//     await emailService.sendEmail(userEmail, subject, text);
//   },

//   async sendCustomEmail(userEmail, subject, text) {
//     await emailService.sendEmail(userEmail, subject, text);
//   },
// };
module.exports = {
  async sendNewCaseOpenedEmail(userEmail, fullName, issueId) {
    const subject = "Maintenance Registration Confirmed: Your Case is Now Open!";

    const text = `Hello ${fullName},

  Namaskar! 
  
  We're delighted to inform you that a new repair case with ID ${issueId} has been opened for your gadget. Our team will review the details and update you on the progress. Thank you for choosing our service.
  
  Thank you for choosing GRMS-NEPAL for your gadget repair needs. We assure you of our prompt and reliable service.

  Best Regards,
  GRMS-NEPAL, Support Team
  `;

    await emailService.sendEmail(userEmail, subject, text);
  },

  async sendReadyToCloseEmail(userEmail, fullName, issueId) {
    const subject = "Your Gadget Repair is Ready for Pickup";
    const text = `Hello ${fullName},

  We're pleased to inform you that your gadget repair with ID ${issueId} is now complete and ready for pickup. 
  Please review the details and feel free to provide any feedback.
  Thank you for choosing our service. We appreciate your trust in us.
  
  Best Regards,
  GRMS-NEPAL, Support Team
  `;

    await emailService.sendEmail(userEmail, subject, text);
  },

  async sendClosedEmail(userEmail, fullName, issueId) {
    const subject = "Gadget Repair Completed: Your Device is Ready!";
    const text = `Dear ${fullName},

  We are thrilled to inform you that your gadget repair with ID ${issueId} has been successfully completed. Your device is now ready for pickup.
  Please visit our service center at your earliest convenience to collect your repaired gadget. 

  If you have any questions or concerns, feel free to reach out to our support team.
  We appreciate your trust in our service and hope your gadget now functions perfectly. 

  Thank you for choosing GRMS-NEPAL.

  Best Regards, 
  GRMS-NEPAL, Support Team
  `;

    await emailService.sendEmail(userEmail, subject, text);
  },

  async sendFeedbackRequestEmail(userEmail, fullName, issueId) {
    const subject = "Your Feedback Matters: Gadget Repair Assessment";
    const text = `Dear ${fullName},

  We hope this message finds you well. Your repaired gadget with ID ${issueId} has been in your possession for some time, and we value your opinion on its condition and the overall repair experience.
  Your feedback is crucial in our ongoing efforts to enhance our services. 

  Kindly take a moment to share your thoughts on our social media.
  If you have any specific comments or concerns, feel free to include them in your response. We genuinely appreciate your time and input.

  Thank you for choosing GRMS-NEPAL. We look forward to hearing from you!

  Best Regards, 
  GRMS-NEPAL, Support Team
  `;

    await emailService.sendEmail(userEmail, subject, text);
  },

  async sendCustomEmail(userEmail, subject, text) {
    await emailService.sendEmail(userEmail, subject, text);
  },
};
