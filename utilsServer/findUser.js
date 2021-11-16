const users = [];

const addUser = async (userId, socketId) => {
    const user = users.find ((user) =>user.userId === userId);

    if (user && user.socketId === socketId) {
        return users;
    }

    else {
        if (user && user.socketId !== socketId) {
            await deleteUser(user.socketId);
        }
    }
}
