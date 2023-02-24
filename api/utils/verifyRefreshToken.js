const jwt = require("jsonwebtoken");

function verifyRefreshToken(req, res, next) {
  const prevToken = req.cookies.refreshToken;
  if (prevToken) {
    jwt.verify(prevToken, process.env.MY_SECRET_REFRESH, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      const newaccesstoken = jwt.sign(
        { id: user._id, username: user.username },
        process.env.MY_SECRET_KEY,
        { expiresIn: "30s" } // 30 seconds
      );
      console.log("Regenerated accessToken\n", newaccesstoken);
      const newrefreshToken = jwt.sign(
        { id: user._id, username: user.username },
        process.env.MY_SECRET_REFRESH
      );
      console.log("Regenerated refreshToken\n", newrefreshToken);

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
}

module.exports = verifyRefreshToken;
