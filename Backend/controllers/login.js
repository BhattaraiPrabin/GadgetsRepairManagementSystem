// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// require("dotenv").config();

// module.exports = {
//     async userLogin(req, res, next) {
//         try {
//             const { email, phone, password } = req.body;
//             let user;

//             if (email) {
//                 user = await User.findOne({ email });
//             } else {
//                 user = await User.findOne({ phone });
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