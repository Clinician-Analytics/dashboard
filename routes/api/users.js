const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route   GET users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("firstName", "First name is required")
      .not()
      .isEmpty(),
    check("lastName", "Last name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("p_number", "Please enter your state issued P Number")
      .not()
      .isEmpty(),
    check("agency", "Enter your agency name e.i. OCES"),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    // Error Handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // User Registration
    const { firstName, lastName, email, p_number, agency, password } = req.body;
    try {
      // Check if email is already registered
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      // Create User instance
      user = new User({
        firstName,
        lastName,
        email,
        p_number,
        agency,
        password
      });
      // Encrypt Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // Save to DB
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("firstName", "First name is required")
      .not()
      .isEmpty(),
    check("lastName", "Last name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("p_number", "Please include your state issued P number")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    console.log(req.body.data);
    res.json({ msg: "This file has been successfully uploaded!" });
  }
);

module.exports = router;
