const Staff = require("../models/staff");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

module.exports = {
    async stafflist(req, res, next) {
        try {
            const staffs = await Staff.find({});
            res.json(staffs);
        } catch (error) {
            next(error);
        }
    },
    async registerStaff(req, res, next) {
        try {
            const {
                staffName,
                password,
                contact,
                email,
                address,
                staffType,
                dob,
                gender,
                registerDate,
                gadgetId,
            } = req.body;
            // console.log(req.body);
            let picturePath = null;

            // Check if a file is uploaded
            if (req.files && req.files.picture) {
                const picture = req.files.picture;
                picture.name = picture.name.replaceAll(" ", "");
                picturePath = `public/images/staff/${picture.name}`;

                // Save the picture to the specified path
                await picture.mv(picturePath);
                picturePath = picturePath.slice(6);
            }
            if (password && password.length < 4) {
                return res
                    .status(400)
                    .send("Password cannot be less then 4 characters");
            }

            const passwordHash = await bcrypt.hash(password, 10);
            console.log(req.body)

            const staff = new Staff({
                staffName,
                passwordHash,
                contact,
                email,
                address,
                staffType,
                dob,
                gender,
                registerDate,
                picture: picturePath,
                gadgetId,
            });

            const savedStaff = await staff.save();

            res.status(201).json(savedStaff);
        } catch (error) {
            console.log({ error })
            next(error);
        }
    },
    async getStaff(req, res, next) {
        try {
            const id = req.params.id;
            const staffs = await Staff.findById(id).exec();

            res.status(200).json(staffs);
            if (!staffs) {
                return res.status(404).json({ error: "Staff not found" });
            }
        } catch (error) {
            next(error);
        }
    },
    async updateStaff(req, res, next) {
        try {
            const id = req.params.id;
            const {
                staffName,
                password,
                contact,
                email,
                address,
                staffType,
                dob,
                gender,
                registerDate,
                gadgetId,
            } = req.body;
            let picturePath = null;

            // Check if a file is uploaded
            if (req.files && req.files.picture) {
                const picture = req.files.picture;
                picture.name = picture.name.replaceAll(" ", "");
                picturePath = `public/images/staff/${picture.name}`;

                // Save the picture to the specified path
                await picture.mv(picturePath);

                picturePath = picturePath.slice(6);
            }
            const staff = await Staff.findById(id).exec();

            // Delete the Staff's picture if it exists
            if (staff.picture) {
                const publicPicturePath = `public/${staff.picture}`;

                // Unlink the picture using the modified path
                await fs.unlink(publicPicturePath);
            }

            let passwords;
            if (password && password.length < 4) {
                return res
                    .status(400)
                    .send("Password cannot be less then 4 characters");
            } else if (password) {
                passwords = await bcrypt.hash(password, 10);
            }

            const staffs = await Staff.findByIdAndUpdate(
                id, {
                    staffName,
                    passwordHash: passwords,
                    contact,
                    email,
                    address,
                    staffType,
                    dob,
                    gender,
                    registerDate,
                    picture: picturePath,
                    gadgetId,
                }, { new: true }
            ).exec();
            res.status(200).json(staffs);
        } catch (error) {
            next(error);
        }
    },
    async deleteStaff(req, res, next) {
        try {
            const id = req.params.id;
            const staff = await Staff.findById(id).exec();

            if (!staff) {
                return res.status(404).json({ error: "User not found" });
            }

            // Delete the Staff's picture if it exists
            if (staff.picture) {
                const publicPicturePath = `public/${staff.picture}`;

                // Unlink the picture using the modified path
                await fs.unlink(publicPicturePath);
            }

            const deletedStaff = await Staff.findByIdAndDelete(id);

            if (!deletedStaff) {
                return res.status(404).json({ error: "Staff not found" });
            }

            res.status(204).end();
        } catch (error) {
            next(error);
        }
    },
};