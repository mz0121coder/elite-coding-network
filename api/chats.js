const express = require ("express");

const router = express.Router ();
const ChatModel = require ("../models/ChatModel");
const UserModel = require ("../models/UserModel");
const authMiddleware = require ("../middleware/authMiddleware");

// GET chats

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

        return res.json(chatsToSend);
    } catch (error) {
        console.error (error);
        return res.status (500).send ("Server Error!");
    }
});


// GET user info

router.get ("/user/:userToFindId", authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userToFindId);

        if (!user) {
            return res.status (404).send ("No User Found");
        }

        return res.join ({ name: user.name, dpLink: user.dpLink});
    }catch (error) {
        console.error (error);
        return res.status (500).send ("Server Error");
    }
});


//Function to delete chat

router.delete(`/:msgsWithUser`, authMiddleware, async (req, res) => {
    try {
      const { userId } = req;
      const { msgsWithUser } = req.params;
  
      const user = await ChatModel.findOne({ user: userId });
  
      const chatToDelete = user.chats.find(
        (chat) => chat.msgsWithUser.toString() === msgsWithUser
      );
  
      if (!chatToDelete) {
        return res.status(404).send("Chat not found");
      }
  
      const indexOf = user.chats
        .map((chat) => chat.msgsWithUser.toString())
        .indexOf(msgsWithUser);
  
      user.chats.splice(indexOf, 1);
  
      await user.save();
  
      return res.status(200).send("Chat deleted");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  });
  
  module.exports = router;


