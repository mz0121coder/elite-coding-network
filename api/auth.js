const express = require ("express");

const router = express.Router ();

const authMiddleware = require ("../middleware/authMiddleware");
const FollowerModel = require ("../models/FollowerModel");
const UserModel = require ("..models/UserModel");


router.get ("/"), authMiddleware, async (req,res) => {
    const {userId} = req;

    try {
        const user = await UserModel.findById (userId);
        if (!user) {
            return res.status(404).send ("User Not Found :( ");
}

const userFollowers = await FollowerModel.findOne({ user:userId });

return res.status (200).json({user, userFollowers });
} catch (error) {
    console.error(error);
    return res.status(500.send ("Server Sleeping - Try Again!");
}
});

router.post ("/"), async (req,res)  => {
    const {email, password } = req.body.user;
    
    if (!isEmail (email)) return res.status (401).send ("Invalid Email");

    if (password.length < ????????6) {
        return res.status 
    }
}

