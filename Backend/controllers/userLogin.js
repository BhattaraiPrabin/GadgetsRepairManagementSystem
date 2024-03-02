const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Gadget = require("../models/gadget")
const Issue = require("../models/issue")
require("dotenv").config();

// module.exports = {
//   async userLogin(req, res, next) {
//     try {
//       const { email, phone, password } = req.body;
//       let user;
//       //console.log(process.env.SECRET); == checking the working process of the env
//       if (email) {
//         user = await User.findOne({ email });
//       } else {
//         user = await User.findOne({ phone });
//       }
//       const passwordCorrect =
//         user === null
//           ? false
//           : await bcrypt.compare(password, user.passwordHash);

//       if (!(user && passwordCorrect)) {
//         return res.status(401).json({
//           error: "invalid username or password",
//         });
//       }

//       const tokenForUser = {
//         email: user.email,
//         id: user._id,
//       };

//       const token = jwt.sign(tokenForUser, process.env.SECRET, {
//         expiresIn: 60 * 30,
//       });

//       res.status(200).send({
//         token,
//         userName: user.userName,
//         name: user.name,
//         id: user._id,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
// };


// module.exports = {
//     async userLogin(req, res, next) {
//         try {
//             const { email, contact, password } = req.body;
//             let user;
//             console.log(req.body)

//             if (email) {
//                 user = await User.findOne({ email });
//             } else {
//                 user = await User.findOne({ contact });
//             }

//             if (!user) {
//                 return res.status(401).json({
//                     error: "User not found",
//                 });
//             }

//             try {
//                 const passwordCorrect =
//                     user.passwordHash === undefined ?
//                     false :
//                     await bcrypt.compare(password, user.passwordHash);

//                 if (!passwordCorrect) {
//                     return res.status(401).json({
//                         error: "Invalid username or password",
//                     });
//                 }

//                 const tokenForUser = {
//                     email: user.email,
//                     id: user._id,
//                 };

//                 const token = jwt.sign(tokenForUser, process.env.SECRET, {
//                     expiresIn: 60 * 30,
//                 });

//                 res.status(200).send({
//                     token,
//                     userName: user.userName,
//                     name: user.name,
//                     id: user._id,
//                     fullName: user.fullName,
//                 });
//             } catch (bcryptError) {
//                 console.error('Error comparing passwords:', bcryptError);
//                 return res.status(500).json({
//                     error: 'Internal server error',
//                 });
//             }
//         } catch (error) {
//             next(error);
//         }
//     },
// };

module.exports = {
    async userLogin(req, res, next) {
        try {
            const { contact, password } = req.body;

            // Find user by contact (assuming 'contact' is unique)
            const user = await User.findOne({ contact });

            if (!user) {
                return res.status(401).json({
                    error: "User not found",
                });
            }

            try {
                const passwordCorrect = user.passwordHash ?
                    await bcrypt.compare(password, user.passwordHash) :
                    false;

                if (!passwordCorrect) {
                    // console.log("Invalid username or password");
                    return res.status(401).json({
                        error: "Invalid username or password",
                    });
                }

                // Prepare the token
                const tokenForUser = {
                    email: user.email,
                    id: user._id,
                };

                const token = jwt.sign(tokenForUser, process.env.SECRET, {
                    expiresIn: 60 * 30,
                });


                // Continue with fetching user, gadget, and issue details
                const gadget = await Gadget.findOne({ userId: user._id });

                if (!gadget) {
                    console.log("Gadget not found for the user");
                    return res.status(404).json({ message: 'Gadget not found for the user' });
                }

                const issue = await Issue.findOne({ gadgetId: gadget._id });

                if (!issue) {
                    console.log("Issue not found for the gadget");
                    return res.status(404).json({ message: 'Issue not found for the gadget' });
                }

                // Prepare the response
                const response = {
                    token,
                    userName: user.userName,
                    name: user.name,
                    id: user._id,
                    fullName: user.fullName,
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
                };

                res.status(200).json(response);
            } catch (error) {
                console.error('Error during user login:', error);
                res.status(500).json({
                    error: 'Internal server error',
                });
            }
        } catch (error) {
            console.error('Error during user login:', error);
            res.status(500).json({
                error: 'Internal server error',
            });
        }
    },
};