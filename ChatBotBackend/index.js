const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { HfInference } = require("@huggingface/inference");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);

app.get("/", (req, res) => {
  res.json({ status: "Server is running" });
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await hf.textGeneration({
      model: "facebook/blenderbot-400M-distill",
      inputs: message,
      parameters: {
        max_length: 100,
        temperature: 0.7,
      },
    });

    console.log("AI reply:", response.generated_text);
    res.json({ reply: response.generated_text });
  } catch (err) {
    console.error("Error with AI API:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
