const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// const authUser = async (req, res, next) => {
//   const token = req.signedCookies.token;
//   if (!token) {
//     return res.status(401).json({ error: "Authorisierung wurde fehlgeschlagen" });
//   } else {
//     console.log('token present');
//   }


//   try {
//     const verified = jwt.verify(token, process.env.JWT_KEY);
//     console.log(verified);
//     req.user = await User.findById(verified);
//     console.log('this is current user', req.user);

//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Authorisierung fehlgeschlagen!!!" });
//   }
// };

// module.exports = {
//   authUser
// };


const authUser = async (req, res, next) => {
    const token = req.signedCookies.token;
    console.log('my user token data: ' + token);

  if (
     token
  ) {

    try {
      const decoded = await jwt.verify(
        token,
        process.env.JWT_KEY
      );

      console.log('decoded token ', decoded.email);
      // req.user = decoded.userId;
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      next('token ist nicht valide');
    }
    next();   
  } else {
    req.user = undefined;
    console.log('undefined error from 62');
    throw new Error('Nicht Authorisiert!')
  }
  if (!token) {
    res.status(401);
    throw new Error("Nicht Authorisiert!, kein token");
  }
};
module.exports = {authUser};

