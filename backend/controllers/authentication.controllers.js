const User = require("../models/user.models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password || !address) {
      return res.status(400).json({
        success: false,
        message: "Please Fill all the Field",
      });
    }

    const exitsUser = await User.findOne({ email });

    if (exitsUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
    });

    return res.status(200).json({
      success: true,
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    console.log(`Error in Signup ${error}`);
    res.status(500).json({
      success: false,
      data: "Error in Signup fuction",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill all the Field",
      });
    }

    let dbUser = await User.findOne({ email });
    if (!dbUser) {
      return res.status(401).json({
        success: false,
        message: "User doesn't exist, please signup",
      });
    }

    const payload = {
      email: dbUser.email,
      id: dbUser._id,
      role: dbUser.role,
    };

    if (await bcrypt.compare(password, dbUser.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      dbUser = dbUser.toObject();
      dbUser.token = token;
      dbUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        dbUser,
        message: "Login Successfull",
      });
    } 
    else {
      // password do not match
      return res.status(403).json({
        success: false,
        message: "Password do not match",
      });
    }
  }
  catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: error.message,
    });
  }
};
