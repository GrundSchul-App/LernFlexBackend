const User = require("../models/user.model");
const bcrypt = require("bcrypt");
//import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "user nicht gefunden:" + id,
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

export const getAllUsers = async (req, res) => {
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

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userUpdated = await User.findByIdAndUpdate(id, req.body, {
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



export const deleteUser = async (req, res) => {
    const id = req.params.id;
  try {  
    await User.findByIdAndDelete(id);  
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
export const registerUser = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;

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
  /*  try {
         const role = "user";
         
         await User.create({ firstName, lastName, email, password, role });
 
         res.status(201).send('user created');
     } catch (error) {
         console.error(error);
         res.status(500).send(error);
     } */
  const role = "user";
  const userCreated = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });

  if (userCreated) {
    const user = await User.findOne({ email: email });

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
          user: user,
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

export const loginUser = async (req, res) => {
  const data = req.body;
  if (!data.email || !data.password) {
    return res.status(400).send("Email oder Passwort leer");
  }

  const user = await User.findOne({ email: data.email });

  if (user) {
    const isValid = await bcrypt.compare(data.password, user.password);

    if (isValid) {
      const tokenData = {
        userId: user._id,
        email: user.email,
      };

      const token = jwt.sign(tokenData, process.env.JWT_KEY);

      return res.json({
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
