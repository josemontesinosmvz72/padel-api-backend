const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Chat = require('../models/chatbot.model');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/message', async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    let chat = await Chat.findOne({ sessionId }) || new Chat({ sessionId, messages: [] });

    const history = chat.messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chatSession = model.startChat({ history });
    const result = await chatSession.sendMessage(message);
    const reply = result.response.text();

    chat.messages.push({ role: 'user', text: message });
    chat.messages.push({ role: 'model', text: reply });
    await chat.save();

    res.json({ reply, sessionId });
  } catch (error) {
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