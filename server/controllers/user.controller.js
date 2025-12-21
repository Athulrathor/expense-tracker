const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt.utils.js');
const { getCookieOptions } = require('../utils/cookiParserOptions.utils.js');
const { uploadFile, deleteFile } = require('../services/imageKit.services.js');
const { generateAvatarColor } = require('../utils/manageAvatarColor.utils.js');

const registerUser = async (req, res) => {

    const { username, password, email } = req.body;

    try {

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All field are is required!" });
        }

        const existedUser = await User.findOne({ where: { email: email } });

        if (existedUser) {
            return res.status(400).json({ message: "User already exist!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username.toLowerCase(),
            email,
            password: hashedPassword,
        },);

        const token = generateToken(newUser.id);

        if (!newUser) {
            return res.status(500).json({ message: "Something wrong on registering user!" });
        }

        return res
            .status(200)
            .cookie('token',token,getCookieOptions())
            .json({
                message: "User registered successfully!", token: token, user: {
                    id: newUser.id,
                    email: newUser.email,
                    username: newUser.username,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt,
            },success:true });
        
    } catch (error) {
        console.error('Register error: ', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const validateUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email) {
            return res.status(400).json({ message: "Email is required!" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password is required!" });
        }

        const user = await User.findOne({
            where: {email: email}
        });

        if (!user) {
            return res.status(400).json({ message: "User is not found!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid user credentials!" });
        }

        const loggedUser = await User.findByPk(user.id, {
            attributes: { exclude: ['password'] }
        });

        const token = generateToken(user.id);

        return res
            .status(200)
            .cookie('token', token, getCookieOptions())
            .json(
                { message: "User loggedin successfully!", token: token, user: loggedUser, success: true }
            );

    } catch (error) {
        console.error('login error: ', error);
        res.status(500).json({ message: 'Internal Server Error!', error: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {

        res.clearCookie('token', getCookieOptions());

        return res.status(200).json({
            message: "Logout successful!"
        });
    } catch (error) {
        console.error('Logout error: ', error);
        res.status(500).json({
            message: 'Internal Server Error!',
            error: error.message
        });
    }
};

const uploadProfilePicture = async (req, res) => {

    const userId = req.user.id;
    const profilePic = req.file;

    try {
        
        if (!profilePic) return res.status(400).json({ message: 'No file uploaded', success: false });

        const uploadedImage = await uploadFile(profilePic);

        if (!uploadedImage || !uploadedImage.url) {
            return res.status(500).json({ message: 'Failed to upload image', success: false });
        }

        const updatedUser = await User.update({ avatar: uploadedImage.url, avatarId: uploadedImage.fileId, avatarColor: null }, { where: { id: userId } });

        if (!updatedUser) {
            return res.status(500).json({message: "Error in Updating Avatar Image!"})
        }

        res.status(200).json({ message: 'File uploaded', avatarId: uploadedImage.fileId, thumnailUrl: uploadedImage.thumbnailUrl, filename: uploadedImage.name,url: uploadedImage.url, path: uploadedImage.filePath, success: true });

    } catch (error) {
        console.error('Profile picture upload error: ', error);
        res.status(500).json({
            message: 'Internal Server Error!',
            error: error.message
        });
    }
    
};

const removeProfilePicture = async (req, res) => {

    const userId = req.user.id;
    const imageId = req.user.avatarId;

    try {

        deleteFile(imageId);

        const updatedUser = await User.update({ avatar: null, avatarId: null, avatarColor: generateAvatarColor(userId)}, { where: { id: userId } });

        if (!updatedUser) {
            return res.status(500).json({ message: "Error in Deleting Avatar Image!" })
        }

        res.status(200).json({ message: 'File Removed', avatarColor: updatedUser.avatarColor, success: true });

    } catch (error) {
        console.error(' Remove profile error: ', error);
        res.status(500).json({
            message: 'Internal Server Error!',
            error: error.message
        });
    }

};

const updateUserEmail = async (req, res) => {
    const userId = req.user.id;

    const { email } = req.body;

    try {

        const updatedUser = await User.update({ email: email }, { where: { id: userId } });

        if (!updatedUser) {
            return res.status(500).json({ message: "Error in Updating User Details!" })
        }

        res.status(200).json({ message: 'User Detail Updated!', user: updatedUser, success: true });

    } catch (error) {
        console.error('User profile update error: ', error);
        res.status(500).json({
            message: 'Internal Server Error!',
            error: error.message
        });
    }
};

module.exports = {
    registerUser,
    validateUser,
    logoutUser,
    uploadProfilePicture,
    removeProfilePicture,
    updateUserEmail
};