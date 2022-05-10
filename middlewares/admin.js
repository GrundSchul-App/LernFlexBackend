const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const authAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Authorisierung fehlgeschlagen" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);

    const verifiedUser = await User.findById(verified.id).select("-password");

    if (!verifiedUser || !verifiedUser.admin) {
      return res.status(401).json({ error: "Authorisierung fehlgeschlagen" });
    }

    req.user = verifiedUser;

    next();
  } catch (error) {
    res.status(401).json({ error: "Authorisierung fehlgeschlagen" });
  }
};

module.exports = {
  authAdmin
};
