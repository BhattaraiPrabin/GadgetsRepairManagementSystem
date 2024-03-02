require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const userLogin = require("express").Router();
const Staff = require("../models/staff");

module.exports = {
    async staffLogin(request, response, next) {
        try {
            const { contact, password } = request.body;
            let staff;
            if (contact) {
                staff = await Staff.findOne({ contact });
            }

            console.log(request.body)
            console.log({staff})
            const passwordCorrect =
                staff === null ?
                false :
                await bcrypt.compare(password, staff.passwordHash);

            console.log({passwordCorrect})
            if (!(staff && passwordCorrect)) {
                return response.status(401).json({
                    error: "invalid Username or Password",
                });
            }
            const tokenForStaff = {
                email: staff.email,
                id: staff._id,
            };
            const token = jwt.sign(tokenForStaff, process.env.SECRET, {
                expiresIn: 60 * 30,
            });
            response.status(200).send({
                token,
                staffName: staff.staffName,
                name: staff.name,
                id: staff._id,
            });
        } catch (error) {
            next(error);
        }
    },
};
