const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(400).json({
        message: "user nicht gefunden:" + userId,
      });
    }
    res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei User Wiedergabe!",
    });
    console.error(error);
  }
};

async function getUserByEmail(req,res){
  const {email}=req.params;
  console.log("email",email);
  try {
    const user=await User.findOne({email:email});

    res.status(200).json({
      message: "success",
      data: user,
    });
  }catch (error) {
    res.status(500).json({
      message: "Fehler bei User Wiedergabe!",
    });
    console.error(error);
  }
}



const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei Users Wiedergabe!",
    });
    console.error(error);
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userUpdated = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
      context: "query",
    });

    res.status(200).json({
      message: "success",
      data: userUpdated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei User Aktualisierung!",
    });
    console.error(error);
  }
};



const deleteUser = async (req, res) => {
    const userId = req.params.userId;
  try {  
    await User.findByIdAndDelete(userId);  
    res.status(200).json({
        message: "success"       
      });
  } catch (error) {
    res.status(500).json({
      message: "Fehler bei User löschen!",
    });
    console.error(error);
  }
};

// ich bin hier
const registerUser = async (req, res) => {
  let { firstName, lastName, email, password, admin } = req.body;

  const checkUser = await User.findOne({ email: email });
  if (checkUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  if (
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]).{8,}$/.test(
      password
    )
  ) {
    res.status(400).json({
      message:
        "Password should contain number, uppercase, lowercase, special character.",
    });
    return;
  }

  password = await bcrypt.hash(password, 10);

  const avatar = gravatar.url(email, { protocol: "https", s: "100" });

  const userCreated = await User.create({
    firstName,
    lastName,
    avatar,
    email,
    password,
    admin,
  });

  if (userCreated) {
    const user = await User.findOne({ email });

    if (user) {
      console.log("User._id", user._id);
      const tokenData = {
        userId: user._id,
        email: user.email,
      };

      const token = jwt.sign(tokenData, process.env.JWT_KEY);
      console.log("User", user);
      return res.json({
        message: "success",
        data: {
          user: {
            firstName,
            lastName,
            avatar,
            email,
            password,
            admin,
          },
          token: token,
        },
      });
    }
  } else {
    return res.status(500).json({
      message: "Fehler bei Konto erstellen!",
    });
  }
};

const loginUser = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).send("Email oder Passwort leer");
  }

  const user = await User.findOne({ email });

  if (user) {
    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      const tokenData = {
        userId: user._id,
        email: user.email,
      };

      const token = jwt.sign(tokenData, process.env.JWT_KEY);
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        secure: process.env.NODE_ENV === "production",
        signed: true,
      });
      return res.status(200).json({
        message: "success",
        data: {
          user: user,
          token: token,
        },
      });
    } else {
      return res.status(402).json({
        message: "Falsches Passwort!",
      });
    }
  } else {
    return res.status(400).json({
      message: "Konto nicht gefunden!",
    });
  }
};

const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(200).json({ msg: "Der Benutzer ist ausgelogt!" });
};

module.exports = {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  logoutUser,
  getUserByEmail
};