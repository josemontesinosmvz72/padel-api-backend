const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk'); // Cambio de librería
const Chat = require('../models/chatbot.model');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/message', async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    let chat = await Chat.findOne({ sessionId }) || new Chat({ sessionId, messages: [] });

    const history = chat.messages.map(m => ({
      role: m.role === 'model' ? 'assistant' : 'user',
      content: m.text
    }));


    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Eres un asistente útil." },
        ...history,
        { role: "user", content: message }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const reply = chatCompletion.choices[0]?.message?.content || "";


    chat.messages.push({ role: 'user', text: message });
    chat.messages.push({ role: 'model', text: reply });
    await chat.save();

    res.json({ reply, sessionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


router.get('/history/:sessionId', async (req, res) => {
  try {
    const chat = await Chat.findOne({ sessionId: req.params.sessionId });
    res.json(chat?.messages || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;