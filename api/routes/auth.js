const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../utils/verifyToken");

//REGISTERs
router.post("/register", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist)
      return res
        .status(400)
        .json("This e-mail address has been taken. Try another one");
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials");

    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.MY_SECRET_KEY,
      { expiresIn: "30d" }
    );

    if (req.cookies["accessToken"]) {
      req.cookies["accessToken"] = "";
    }

    const { password, ...others } = user._doc;
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", verify, async (req, res) => {
  const token = req.cookies.accessToken;
  if (token) {
    jwt.verify(token, process.env.MY_SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      res.clearCookie("accessToken");
      req.cookies["accessToken"] = "";
      return res.status(200).json("Successfully Logged Out.");
    });
  } else {
    return res.status(401).json("Authentication failed!");
  }
});

module.exports = router;
