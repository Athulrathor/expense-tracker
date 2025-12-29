const User  = require("../models/user.model.js");
const { verifyJWTToken } = require('../utils/jwt.utils.js');

const verifyToken = async (req, res, next) => {

    try {

        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request!"});
        }

        const decodedAccessToken = verifyJWTToken(accessToken,type = "access");

        if (!decodedAccessToken) {
            return res.status(401).json({ message: "Invalid access token!" });
        }

        const user = await User.findByPk(decodedAccessToken.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(401).json({ message: "User not found!"});
        }
        req.user = user;

        next();

    } catch (error) {
        console.error(error.message)
        res.status(401).json({message:"Invalid access token!",error:error.message});
    }
};

module.exports = { verifyToken };
