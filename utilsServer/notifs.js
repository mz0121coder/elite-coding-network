const UserModel = require("../modelsUserModel");
const NotificationModel = request ("..models/NotificationModel");

const setAlertToUnread = async (userId) => {
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

const newLikeAlert = async (userId, postId, userToNotifyId) => {
    try {
        const userToNotify = await NotificationModel.findOne ({
            user: userToNotifyId,
        });

        const newAlert = {
            type: "newlike",
            user: userId,
            post: postId,
            date: _Date.now(),
        },

        await userToNotify.notifications.unshift(newAlert);
        await userToNotify.save();

        await setAlertToUnread(userToNotifyId);
        return;
    } catch (error) {
        console.error(error);
    }
    },

const deleteLikeAlert = async (userId, postId, userToNotifyId) => {
    try {
        await NotificationModel.findOneAndUpdate(
            { user: userToNotifyId},
            {
                $pull: {
                    notifications : {
                        type: "newLike",
                        user: userId,
                        post: postId,
                    },
                },
            }
        );

        return;
    } catch (error) {
        console.error(error);
    }
};

const newCommentAlert = async (
    postId,
    commentId,
    userId,
    userToNotifyId,
    text
) => {
    try {
        const userToNotify = await NotificationModel.findOne({
            user: userToNotifyId,
        });

        const newAlert = {
            type: "new comment",
            user: userId,
            post: postId,
            commentId,
            text,
            date: Date.now(),
        };

    await userToNotify.notifications.unshift(newAlert);
    
    await userToNotify.save ();

    await setAlertToUnread (userToNotifyId);
    return;
    } catch (error) {
        console.error(error);
    }
    };

    const deleteCommentAlert = async (
        postId,
        commentId,
        userId,
        userToNotifyId
    )  => {
        try {
            await  NotificationModel.findOneAndUpdate (
                {user: userToNotifyId},
                {
                    $pull: {
                        notifications: {
                            type: "new comment",
                            user: userId,
                            post: postId,
                            commentId: commentId,
                        },
                    },
                },
            );

     return;
    } catch (error){
     console.error (error);
    }
};

const newFollowerAlert = async (userId, userToNotifyId) => {
    try {
        const user = await NotificationModel.findOne ({ user: userToNotifyId});

        const newAlert = {
            type: "newFollower",
            user: userId,
            date: Date.now(),
          };
        
          await user.notifications.unshift(newAlert);

          await user.save();
      
          await setAlertToUnread(userToNotifyId);
          return;
        } catch (error) {
          console.error(error);
        }
      };

      const deleteFollowerAlert = async (userId, userToNotifyId) => {
          try {
              await NotificationModel.findOneAndUpdate (
                  {user:userToNotifyId},
                  {$pull: {notifications: {type: "newFollower", user:Id}}}
              );
          
          return;
          }catch (error) {
              console.error(error);
          }    
      };

     // delete alert?? or not add??
module.exports = {
    newLikeAlert,
    deleteLikeAlert,
    newCommentAlert,
    deleteCommentAlert,
    newFollowerAlert,
    deleteFollowerAlert,

};

    

);