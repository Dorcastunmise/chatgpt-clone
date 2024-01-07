const { Configuration, OpenAI } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3090;

const configuration = new Configuration({
  organization: 'org-AY6vv5nZ8oYpSZFVG3PBVrsM',
  apiKey: "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",
});

const openai = new OpenAI(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.completions.create({
      model: "davinci-002",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });

    res.json({
      message: completion,
    });
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});