const ChatModel = require ("..models/ChatModel");
const ChatModel = require ("..models/userModel");
const UserModel = require("../models/UserModel");

const loadMessages =async (userId, msgsWithUser => {
    try {
        const user = await ChatModel.findOne ({ user: userId}).populate(
            "chats.msgsWithUser"
        );

        const chat = user.chats.find(
            (chat) => chat.msgsWithUser._id.toString() === msgsWithUser
        );

        if (!chat) {
            return { error: "No chat found"};
        }

        return { chat };
    } catch (error) {
        console.log (error);
        return { error };
    } 
    };

   const sendMsg = async (userId, msgSendToUserId, msg) => {
       try {
        
           const user = await ChatModel.findOne({ user:userId});

           const msgSendToUser = await ChatModel.findOne ({ user:msgSendToUserId});

           const newMsg = {
               sender: userId,
               receiver: msgSendToUserId,
               msg,
               date: Date.now(),
            
           };

           const previousChat = user.chats.find (
               (chat) => chat.msgsWithUser.toString() === msgSendToUserId
           );

           if (previousChat) {
               previousChat.messages.push(newMsg);
               await user.save();
           }
           
           else {
               const newChat = {msgsWithUser: msgSendToUserId, messages: [newMsg] };
               user.chats.unshift(newChat);
               await user.save();
           }

           const previousChatList = msgSendToUser.chats.find(
               (chat) => chat.msgsWithUser.toString() === userId
           );
           
           if (previousChatList) {
               previousChatList.messages.push(newMsg);
               await msgSendToUser.save();
           }

           else {
               const newChat = {msgsWithUser: userId, messages: [newMsg] };
               msgSendToUser.chats.unshift(newChat);
               await msgSendToUser.save();
           }

           return {newMsg };
       }catch (error) {
           console.error(error);
           return {error};
        
       }
   };

   const setMsgToUnread = async (userId) => {
       try {
           const user = await UserModel.findById(userId);

           if (!user.unreadMsg) {
               user.unreadMsg = true;
               await user.save ();
           }

           return;
        }catch (error) {
            console.error(error);
        }
       };
    const deleteMsg = async (userId, msgsWithUser, messageId => {
        try {
            const user =await ChatModel.findOne({ user: userId});

            const chat = user.chats.find(
                (chat) => chat.msgsWithUser.toString() === msgsWithUser
            );

            if (!chat) return
        }
    })
   }
           )


       }
   }
})