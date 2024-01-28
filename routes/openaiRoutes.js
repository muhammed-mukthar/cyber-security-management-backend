const express = require("express");
const {
  summaryController,
  paragraphController,
  chatbotController,
  jsconverterController,
  scifiImageController,
  animeImageController,
  emailController,
  lofiImageController,
  historyController,
} = require("../controllers/openaiController");
const historyHandler = require("../middlewares/historyMiddleware");
const protect = require("../middlewares/autherisationMiddleware");

const router = express.Router();

//route
router.post("/summary", protect, historyHandler, summaryController);
router.post("/paragraph", protect, historyHandler, paragraphController);
router.post("/chatbot", protect, historyHandler, chatbotController);
router.post("/js-converter", protect, historyHandler, jsconverterController);
router.post("/scifi-image", protect, historyHandler, scifiImageController);
router.post("/anime-image", protect, historyHandler, animeImageController);
router.post("/lofi-image", protect, historyHandler, lofiImageController);
router.post("/email", protect, historyHandler, emailController);
router.get("/history", protect, historyController);

module.exports = router;
