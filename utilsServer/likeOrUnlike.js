const UserModel = require ("../models/UserModel");
const likeOrUnlike = async (postId, UserId, like) = {
    try {
        const post = await PostModel.findbyId (postId);

        if (!post) return {error: "No post found"};

        if (like) {
            const isLiked =
            post.likes.filter((like)) => like.user.tostring() === userId.length >0;

            if (isLiked) return { error: Post liked before"};

            await post.likes.unshift({ user: userId});
        }
    }
}
}

