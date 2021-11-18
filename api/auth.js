const express = require ("express");

const router = express.Router ();

const UserModel = require ("..models/UserModel");
const FollowerModel = require ("../models/FollowerModel");

router.get ("/"), authMiddleware, async (req,res) =>{
    const {userId} =req;

    try {
        const user = await UserModel.findById (userId);
        if (!user) {
            return res.status(404).send ("User Not Found");
        }
    }
}

const userFollowers = await FollowerModel.findOne({user:userId});

return res.status (200).json({user, userFollowers });
} catch (error) {
    console.error(error);
    return res.status(500.send ("Server Error");
}
});