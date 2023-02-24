const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../utils/verifyToken");

//REGISTER
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
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.MY_SECRET_REFRESH
    );

    if (req.cookies["accessToken"]) {
      req.cookies["accessToken"] = "";
    }
    if (req.cookies["refreshToken"]) {
      req.cookies["refreshToken"] = "";
    }

    const { password, ...others } = user._doc;
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//REFRESH
router.get("/refresh", async (req, res, next) => {
  const prevToken = req.cookies.refreshToken;
  if (prevToken) {
    jwt.verify(prevToken, process.env.MY_SECRET_REFRESH, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      const newaccesstoken = jwt.sign(
        { id: user._id, username: user.username },
        process.env.MY_SECRET_KEY,
        { expiresIn: "30s" } //30 seconds
      );
      console.log("Regenerated accessToken\n", newaccesstoken);
      const newrefreshToken = jwt.sign(
        { id: user._id, username: user.username },
        process.env.MY_SECRET_REFRESH
      );
      console.log("Regenerated refreshToken\n", newrefreshToken);
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n");

      res.cookie("accessToken", newaccesstoken, {
        expires: new Date(Date.now() + 1000 * 30), // 30 seconds
        httpOnly: true,
      });
      res
        .cookie("refreshToken", newrefreshToken, {
          httpOnly: true,
        })
        .sendStatus(200);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
});

//LOGOUT
router.post("/logout", verify, async (req, res) => {
  const token = req.cookies.accessToken;
  if (token) {
    jwt.verify(token, process.env.MY_SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(200).json("Successfully Logged Out.");
    });
  } else {
    return res.status(401).json("Authentication failed!");
  }
});

module.exports = router;
