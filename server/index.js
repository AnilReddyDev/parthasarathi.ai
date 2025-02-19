const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const { createClient } = require("@deepgram/sdk");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);


const gemini_api_key = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});


app.use(express.json());
app.use(cors({
  credentials:true,
  origin:'http://localhost:5173'
}));

const storage = multer.diskStorage({
  destination: "./videos/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/upload",upload.single("video"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video uploaded" });
    }
    
    const question = req.body.question;  // Access question text
    console.log("Received question:", question);
    console.log("Video file saved:", req.file.filename);
  
    res.json({ message: "Video and question uploaded successfully", file: req.file.filename, question });
  } catch (error) {
    console.log("response error", error);
  }
});

app.get("/", async(req, res) => {
  res.send("Server is running");
  try {
    const convert = (input, output) => {
      return new Promise((resolve, reject) => {
        ffmpeg(input)
          .output(output)
          .on("end", () => {
            console.log("Conversion ended");
            resolve();
          })
          .on("error", (err) => {
            console.error("Error:", err);
            reject(err);
          })
          .run();
      });
    };

    const transcribe = async () => {
      const {
        result,
        error,
      } = await deepgram.listen.prerecorded.transcribeFile(
        fs.readFileSync("./audios/output1.mp3"),
        {
          model: "nova-2",
        }
      );

      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Transcription failed" });
      }

      // Extracting text from result
      const transcript =
        result?.results?.channels[0]?.alternatives[0]?.transcript ||
        "No transcript available";
      console.log(transcript);
      return transcript;
    };

    // await convert('./videos/Video-1.webm', './audios/output1.mp3');
    // const userresponse = await transcribe();

    const generate = async (query) => {
      try {
        const prompt = query;
        const result = await geminiModel.generateContent(prompt);
        const response = result.response;
        console.log("response", response.text());
        res.json({ response: response.text(), userres: userresponse });
      } catch (error) {
        console.log("response error", error);
      }
    };


//     const query = ` "AI role, that means your role": "You are an expert interviewer providing detailed feedback on a candidate's spoken response. Your task is to evaluate their response based on communication skills, confidence, relevance, and professionalism. Provide constructive feedback with clear suggestions for improvement." 

// "Question to user": tell me about yourself? and "response from user":${userresponse}`;

    // await generate(query);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
