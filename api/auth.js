const express = require ("express");

const router = express.Router ();

const authMiddleware = require ("../middleware/authMiddleware");
const FollowerModel = require ("../models/FollowerModel");
const UserModel = require ("..models/UserModel");
const { JsonWebTokenError } = require("jsonwebtoken");


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

    if (password.length < 8) {
        return res.status (401).send ("Your password must be atleast 8 characters long");
    }

    try {
        const user + await UserModel.findOne({email: email.toLowerCase()}).select (
            "+password"
        );

        if (!user) {
            return res.status (401).send ("Not recognised");
        }

        //encryption???

        const payload = { userId: user._id };
        jwt.sign(
            payload,
            process.env.jwtSecret,
            {expiresIn: 24hours},
            (err,token) => {
                if (err) throw err;
                res.status(200).json(token);
            }
        );
    } catch (error) {
        console.error (error);
        return res.status (500).send ("Server Sleeping - Try again!");
    }
};

module.exports = router;

