const errorHandler = require("../middlewares/errorMiddleware");
const QuizOptions = require("../models/QuizModal");
const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

// JWT TOKEN
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  console.log(user, token, "this is token");
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

//REGISTER
exports.registerContoller = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //exisitng user
    const exisitingEmail = await userModel.findOne({ email });
    if (exisitingEmail) {
      return res.status(500).json({
        success: false,
        message: "email  already exist",
      });
    }
    const user = await userModel.create({ username, email, password });
    req.userid = user.id;

    this.sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//LOGIN
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).json("email password required");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).json({ error: "Invalid Credentials" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    //res
    this.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

//LOGOUT
exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logged out Succesfully",
  });
};

exports.userListController = async (req, res, next) => {
  try {
    const userData = await userModel.find();
    console.log(userData);
    return res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createQuizController = async (req, res, next) => {
  try {
    const quizOption = new QuizOptions(req.body.quizOptions);
    await quizOption.save();
    res.status(201).json(quizOption);
  } catch (error) {
    console.error("Error creating quiz option:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.listQuizController = async (req, res, next) => {
  try {
    let QuizData = await QuizOptions.find();
    res.status(201).json(QuizData);
  } catch (error) {
    console.error("Error creating quiz option:", error);
    res.status(500).send("Internal Server Error");
  }
};
