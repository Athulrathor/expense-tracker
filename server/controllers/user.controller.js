const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt.utils.js');
const { getCookieOptions } = require('../utils/cookiParserOptions.utils.js');

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



        res.status(200).json({ message: 'File uploaded', filename: profilePic.filename, path: `/uploads/${profilePic.filename}`, success: true });

    } catch (error) {
        console.error('Profile picture upload error: ', error);
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
};