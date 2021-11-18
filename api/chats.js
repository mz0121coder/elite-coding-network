const express = require ("express");

const router = express.Router ();
const ChatModel = require ("../models/ChatModel");
const UserModel = require ("../models/UserModel");
const authMiddleware = require ("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
    try {
        const { userId } = req;

        const user = await ChatModel.findOne ({user: userId }).populate (
            "chats.msgWithUser"
        );

        let chatsToSend = [];

        if (user.chats.length > 0) {
            chatsToSend = await user.chats.map((chat) => ({
                msgsWithUser: chat.msgsWithUser._id,
                name: chat.msgWithUser.name,
                dpLink: chat.msgsWithUser.dpLink,
                lastMessage: chat.messages[chat.messages.length -1].msg,
                date: chat.messages [chat.messages.length -1].date,
            }));
        }
    }

