const express = require('express');
const router = express.Router();
const messageModel = require('../models/message');

// Endpoint to get all messages
router.get('/messages', (req, res) => {
    messageModel.getAllMessages((err, messages) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching messages' });
        }
        res.json(messages);
    });
});

// Endpoint to save a new message
router.post('/messages', (req, res) => {
    const msg = req.body.message;
    if (!msg) {
        return res.status(400).json({ error: 'Message text is required' });
    }
    messageModel.saveMessage(msg, (err, message) => {
        if (err) {
            return res.status(500).json({ error: 'Error saving message' });
        }
        res.json(message);
    });
});

module.exports = router;
