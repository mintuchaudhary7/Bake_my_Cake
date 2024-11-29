const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    let hashedPassword

    try{
        hashedPassword = await bcrypt.hash(password, 10);
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

    const newUser = await User.create({name, email, password:hashedPassword, address});


    return res.status(200).json({
        success:true,
        data:newUser,
        message:"User created successfully"
    })

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


exports.login = async (req, res) =>{
  try{

  }
  catch(error){
    
  }
}