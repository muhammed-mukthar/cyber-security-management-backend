const History = require("../models/historyModal");

const historyHandler = async (req, res, next) => {
  try {
    console.log(req.body, req.user, "tji");
    const { method, originalUrl, body } = req;
    console.log(body); // Add the entry to the email history
    console.log(req.user, "her data");
    console.log({
      historyText: req.body?.text,
      type: originalUrl,
      customDate: new Date(),
      createdUser: req?.user?._id,
    });
    const historyData = await History.create({
      historyText: body?.text,
      type: originalUrl,
      customDate: new Date(),
      createdUser: req?.user?._id,
    });
    next();
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message || "Server Error",
    });
  }
};
module.exports = historyHandler;
