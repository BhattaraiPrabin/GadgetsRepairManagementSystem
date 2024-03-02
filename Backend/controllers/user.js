const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const User = require("../models/user");

const router = express.Router();

module.exports = {
  async userList(req, res, next) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  async registerUser(req, res, next) {
    try {
      let {
        fullName,
        password,
        contact,
        email,
        address,
        userType,
        dob,
        gender,
        subscriptionStatus,
      } = req.body;
      console.log(req.body);

      let picturePath = null;

      // Check if a file is uploaded
      if (req.files && req.files.picture) {
        const picture = req.files.picture;
        picture.name = picture.name.replaceAll(" ", "");
        picturePath = `public/images/user/${picture.name}`;

        // Save the picture to the specified path
        await picture.mv(picturePath);
        picturePath = picturePath.slice(6);
      }

      // Set a default password if not provided
      // if (!password) {
      //   password = "grms";
      // }

      // Hash the password
      console.log(password);

      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User({
        fullName,
        passwordHash,
        contact,
        email,
        address,
        userType,
        dob,
        gender,
        subscriptionStatus,
        picture: picturePath,
      });

      const savedUser = await user.save();

      res.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
  },

  async getUser(req, res, next) {
    try {
      const id = req.params.id;
      const user = await User.findById(id).exec();

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    try {
      const id = req.params.id;
      const {
        fullName,
        password,
        contact,
        email,
        address,
        userType,
        dob,
        gender,
        subscriptionStatus,
      } = req.body;

      const path = require('path');

      let picturePath = null;

      if (req.files && req.files.picture) {
        const picture = req.files.picture;
        picture.name = picture.name.replace(/\s+/g, "_");
        const targetDirectory = path.join(__dirname, 'public', 'images', 'user');

        if (!fs.existsSync(targetDirectory)) {
          fs.mkdirSync(targetDirectory, { recursive: true });
        }

        picturePath = path.join(targetDirectory, picture.name);

        try {
          await picture.mv(picturePath);
          const relativePath = path.relative(path.join(__dirname, 'public'), picturePath);
          picturePath = relativePath.replace(/\\/g, '/');
        } catch (error) {
          console.error("Error saving the picture:", error);
          res.status(500).send("Error saving the picture");
          return;
        }
      }




      const user = await User.findById(id).exec();

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.picture) {
        const modifiedPath = user.picture.replace(/\//g, '\\'); // Replace forward slashes with backslashes for Windows compatibility
        const absolutePath = path.join(__dirname, 'public', modifiedPath);

        try {
          await fs.promises.unlink(absolutePath);
        } catch (error) {
          console.error("Error unlinking the picture:", error);
        }
      }


      let updatedPasswordHash;
      if (password) {
        updatedPasswordHash = await bcrypt.hash(password, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          fullName,
          passwordHash: updatedPasswordHash,
          contact,
          email,
          address,
          userType,
          dob,
          gender,
          subscriptionStatus,
          picture: picturePath,
        },
        { new: true }
      ).exec();

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const id = req.params.id;
      const user = await User.findById(id).exec();

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.picture) {
        const modifiedPath = user.picture.replace(/\//g, '\\'); // Replace forward slashes with backslashes for Windows compatibility
        const absolutePath = path.join(__dirname, 'public', modifiedPath);

        try {
          await fs.promises.unlink(absolutePath);
        } catch (error) {
          console.error("Error unlinking the picture:", error);
        }
      }


      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};
