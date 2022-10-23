const router = require("express").Router();
const OwnerModel = require("../models/Owner.model");
const AdminModel = require("../models/Admin.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

//POST "api/auth/signup" => User registration
router.post("/signup", async (req, res, next) => {
  const { email, password, username, name, surname, avatar, dni } = req.body;
  //BACKEND VALIDATION email
  if (!email) {
    res.status(400).json({ errorMessage: "Enter a correct email" });
    return;
  }
  //BACKEND VALIDATION password
  if (!password) {
    res.status(400).json({ errorMessage: "Enter a correct password" });
    return;
  }
  //BACKEND VALIDATION username
  if (!username) {
    res.status(400).json({ errorMessage: "Enter an username" });
    return;
  }
  //BACKEND VALIDATION dni
  if (!dni) {
    res.status(400).json({ errorMessage: "You need enter a DNI for signup" });
    return;
  }

  //BACKEND VALIDATION password

  const passwordRegex = /^(?=.*\d{1})(?=.*[A-Z]{1})[A-Z\d]{8,12}$/;
  if (passwordRegex.test(password) === false) {
    res
      .status(411)
      .json({
        errorMessage:
          "Need password with between 8 and 12 characters, 1 upper case letter, 1 number",
      });
    return;
  }

  //ASYNC FUNCTION FOR ENCRYPT PASSWORD & CREATE A USER(OWNER)
  try {
    const foundUser = await OwnerModel.findOne({ email, dni });
    if (foundUser !== null) {
      res.status(400).json({ errorMessage: "User already exists" });
    }
    // ENCRYPT PASSWORD
    const salt = await bcryptjs.genSalt(12);
    const hashPassword = await bcryptjs.hash(password, salt);

    //CREATE A NEW USER (OWNER)
    await OwnerModel.create({
      username,
      password: hashPassword,
      name,
      surname,
      dni,
      image: req.file.path,
    });
    res.status(201).json();
  } catch (error) {
    res.json(error);
  }
});

//POST "api/auth/login" => VERIFICATION OF CREDENTIALS & LOGIN
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  //BACKEND VALIDATION empty fields
  if (!email || !password) {
    res.status(401).json({ errorMessage: "All fields must be completed " });
    return;
  }

  //BACKEND VALIDATION email

  if (!email) {
    res.status(400).json({ errorMessage: "Enter a correct email" });
    return;
  }

  //BACKEND VALIDATION password
  const passwordRegex = /^(?=.*\d{1})(?=.*[A-Z]{1})[A-Z\d]{8,12}$/;
  if (!password || passwordRegex.test(password) === false) {
    res.status(400).json({ errorMessage: "Enter a correct password" });
    return;
  }

  //USER VALIDATION
  try {
    const foundUser = await OwnerModel.findOne({ email: email });
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "User already exists" });
      return;
    }

    //CREATE USER(OWNER) SESSION
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      username: foundUser.username,
      image: foundUser.avatar,
    };

    //CONTROL OF TOKEN
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "12h",
    });
    res.json({ authToken: authToken });
  } catch (error) {
    res.json(error);
  }
});

//GET "api/auth/verify" => Check that the token is valid
router.get("/verify", isAuthenticated, (req, res, next) => {
  res.json(req.payload);
});

module.exports = router;
