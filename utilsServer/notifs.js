const UserModel = require("../modelsUserModel");
const NotificationModel = request ("..models/NotificationModel");

const setAlertToUnread = async (userId => {
    try {
        const user = await UserModel.findById (userId);

        if (!user.unreadNotification){
            user.unreadNotification = true;
            await user.save();
        }

        return;
    }catch (error) {
        console.error(error);
    }
};

const newLikeAlert = async (userId, postId, userToNotifySS)
});