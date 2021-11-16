const UserModel = require ("../models/UserModel");
const PostModel = require("../models/PostModel");
const { newLikeAlert, deleteLikeAlert } = require("../utilsServer/notifs");


const likeOrUnlike = async (postId, UserId, like) => {
    try {
        const post = await PostModel.findbyId (postId);

        if (!post) return {error: "No post found"};

        if (like) {
            const isLiked =
            post.likes.filter((like) => like.user.tostring() === userId).length >0;

            if (isLiked) return { error: "Post liked before"};

            await post.likes.unshift({ user: userId});
            
            await post.save ();

            if (post.user.toString () !== userId) {
                await newLikeAlert(userId, postId, post.user.toString());

            }
        }
        else {
            const isLiked =
            post.likes.filter((like) => like.user.toString() === userId).length === 0;
            
            if (isLiked) return {error: "Post not liked before"};

            const indexOf = post.likes
            .map (( like) => like.user.toString())
            .indexOf(userId);

            await post.likes.splice(indexOf, 1);  

            await post.save();

            if (post.save());

            if (post.user.toString()!== userId) {
                await deleteLikeAlert (userId, postId, post.user.toString());
            }
        }

        const user =await UserModel.findById(UserId);

        const {name, dpLink, username } = user;

        return {
            success: true,
            name,
            dpLink,
            username, 
            postByUserId: post.user.toString(),
        };
    } catch (error) {
        return { error: "Server Error "};
    }
};

module.exports = { likeOrUnlike };




   

    