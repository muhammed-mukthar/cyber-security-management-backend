const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const History = require("../models/historyModal");

const OpenAI = require("openai"); // Use require for JavaScript

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your actual API key
});

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `Summarize this \n${text}` }],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices);

    if (chatCompletion.choices) {
      if (chatCompletion.choices[0].message.content) {
        return res.status(200).json(chatCompletion.choices[0].message.content);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "user", content: `write a detail paragraph about \n${text}` },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices);

    if (chatCompletion.choices) {
      if (chatCompletion.choices[0].message.content) {
        return res.status(200).json(chatCompletion.choices[0].message.content);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: `${text}` }],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices);

    if (chatCompletion.choices) {
      if (chatCompletion.choices[0].message.content) {
        return res.status(200).json(chatCompletion.choices[0].message.content);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `convert these instructions into Bash scripts \n${text}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices);

    if (chatCompletion.choices) {
      if (chatCompletion.choices[0].message.content) {
        return res.status(200).json(chatCompletion.choices[0].message.content);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createImage({
      prompt: `generate a scifi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (data) {
      if (data.data[0].url) {
        return res.status(200).json(data.data[0].url);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.lofiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createImage({
      prompt: `generate a lofi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (data) {
      if (data.data[0].url) {
        return res.status(200).json(data.data[0].url);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.animeImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createImage({
      prompt: `generate a anime image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (data) {
      if (data.data[0].url) {
        return res.status(200).json(data.data[0].url);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.emailController = async (req, res) => {
  try {
    const { text } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `write a email on \n${text}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices);

    if (chatCompletion.choices) {
      if (chatCompletion.choices[0].message.content) {
        return res.status(200).json(chatCompletion.choices[0].message.content);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.historyController = async (req, res) => {
  try {
    let user = req.user;
    const data = await History.find({ createdUser: user?._id });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
