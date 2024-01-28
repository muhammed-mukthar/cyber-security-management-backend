const express = require("express");
const {
  registerContoller,
  loginController,
  logoutController,
  userListController,
  createQuizController,
  listQuizController,
} = require("../controllers/authController");

//router object
const router = express.Router();

//routes
// REGISTER
router.post("/register", registerContoller);

//LOGIN
router.post("/login", loginController);

//LOGOUT
router.post("/logout", logoutController);

router.post("/list", userListController);
router.post("/create-quiz", createQuizController);
router.post("/list-quiz", listQuizController);

module.exports = router;
