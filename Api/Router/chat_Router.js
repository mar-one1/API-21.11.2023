const express = require('express');
const router = express.Router();
const messageModel = require('../Model/chat');

// Endpoint to get all messages
router.get('/messages', (req, res) => {
    messageModel.getAllMessages((err, messages) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching messages' });
        }
        res.json(messages);
    });
});
// Endpoint to get messages by recipe id
router.get('/messages/:recipeId', (req, res) => {
    const id = req.params.recipeId;
    console.log(id);
    messageModel.getMessagesByRecipe(id, (err, messages) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching messages' });
        }
        res.json(messages);
    });
});
// Endpoint to save a new message
router.post('/messages', (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Message text is required' });
    }
    messageModel.saveMessage(data, (err, message) => {
        if (err) {
            return res.status(500).json({ error: 'Error saving message' });
        }
        res.json(message);
    });
});

module.exports = router;
