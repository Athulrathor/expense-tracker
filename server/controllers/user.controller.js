const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt.utils.js');
const { getCookieOptions } = require('../utils/cookiParserOptions.utils.js');
const { uploadFile, deleteFile } = require('../services/imageKit.services.js');
const { generateAvatarColor } = require('../utils/manageAvatarColor.utils.js');
const { sendVerificationEmail, verifyCode } = require('../utils/manageMailVerification.utils.js');

const initialRegistration = async (req, res) => {

    const { email, username } = req.body;

    try {

        if (!email || !username) {
            return res.status(400).json({ 
                success: false,
                message: "Email and username are required" 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid email format" 
            });
        }
s
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "Email already registered" 
            });
        }

        const otpSend = await sendVerificationEmail(email, 'registration');

        if (!otpSend?.success) {
            return res.status(500).json({ 
                success: false,
                message: "Failed to send verification email",
                error: otpSend?.error || "Unknown error"
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Verification code sent to your email",
            email: email
        });

    } catch (error) {
        console.error('Initiate Registration Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};

const finalRegisteration = async (req, res) => {

    const { username, password, email, otp } = req.body;

    try {

        if (!username || !email || !password || !otp) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid email format" 
            });
        }

        if (password.length < 8) {
            return res.status(400).json({ 
                success: false,
                message: "Password must be at least 8 characters long" 
            });
        }

        const verificationResult = await verifyCode(email, otp, 'registration');

        if (!verificationResult.success) {
            return res.status(400).json({ 
                success: false,
                message: verificationResult.error || "Invalid or expired OTP",
                attemptsRemaining: verificationResult.attemptsRemaining
            });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username: username.toLowerCase(),
            email,
            password: hashedPassword,
            isEmailVerified: true,
        });

        const token = generateToken(newUser.id);

        return res
            .status(201)
            .cookie('token', token, getCookieOptions())
            .json({
                success: true,
                message: "User registered successfully!",
                token: token,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    username: newUser.username,
                    isEmailVerified: newUser.isEmailVerified,
                    createdAt: newUser.createdAt
                }
            });

    } catch (error) {
        console.error('Register Error:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
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

const verificationMailSend = async (req, res) => {

    const { email } = req.body;
    
    try {

        if (!email) {
            return res.status(400).json({ 
                success: false,
                message: "Email is required" 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid email format" 
            });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(200).json({ 
                success: true,
                message: "If an account exists with this email, you will receive a password reset code"
            });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ 
                success: false,
                message: "Email is already verified" 
            });
        }

        const otpMailSends = await sendVerificationEmail(email,'password_reset');

        if (!otpSend?.success) {
            console.error('Failed to send password reset email:', otpSend?.error);
            // Still return success to not reveal user existence
        }

        return res.status(200).json({ 
            success: true,
            message: "If an account exists with this email, you will receive a password reset code"
        });

    } catch (error) {
        console.error('Forget Password Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};

const verificationMailVerify = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ 
                success: false,
                error: 'Email and OTP are required' 
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false,
                error: "Invalid email format" 
            });
        }

        if (!/^\d{6}$/.test(otp)) {
            return res.status(400).json({ 
                success: false,
                error: 'Invalid OTP format' 
            });
        }

        const result = await verifyCode(email, otp,'password_reset');

        // if (result.success) {
        //     await User.update(
        //         { isEmailVerified: true },
        //         { where: { email } }
        //     );

        //     return res.status(200).json({ 
        //         success: true,
        //         message: 'Email verified successfully',
        //         status: result.status 
        //     });
        // } else {
        //     return res.status(400).json({ 
        //         success: false,
        //         error: result.message || 'Invalid or expired OTP',
        //         status: result.status 
        //     });
        // }

        if (!verificationResult.success) {
            return res.status(400).json({ 
                success: false,
                message: verificationResult.error || "Invalid or expired OTP",
                attemptsRemaining: verificationResult.attemptsRemaining
            });
        }

        return res.status(200).json({ 
            success: true,
            message: 'OTP verified successfully. You can now reset your password.'
        });
        
    } catch (error) {
        console.error('Verify Password Reset OTP Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};

const forgetPasswordChange = async (req, res) => {

    const { email, otp, newPassword } = req.body;

    try {

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ 
                success: false,
                message: "Password must be at least 8 characters long" 
            });
        }

        const verificationResult = await verifyCode(email, otp, 'password_reset');

        if (!verificationResult.success) {
            return res.status(400).json({ 
                success: false,
                message: verificationResult.error || "Invalid or expired OTP",
                attemptsRemaining: verificationResult.attemptsRemaining
            });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await user.update({ password: hashedPassword });

        return res.status(200).json({ 
            success: true,
            message: "Password reset successfully. You can now login with your new password."
        });

    } catch (error) {
        console.error('Password Change Error: ', error);
        res.status(500).json({
            message: 'Internal Server Error!',
            error: error.message
        });
    }
};

const resendOtp = async (req,res) => {

    const { email, purpose} = req.body;

    try {
        
        if (!email || !purpose) {
            return res.status(400).json({ 
            success: false,
            message: "Email and purpose are required" 
            });
        }

        const validPurposes = ['registration', 'password_reset', 'email_verification'];
        if (!validPurposes.includes(purpose)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid purpose. Must be 'registration', 'password_reset', or 'email_verification'" 
            });
        }

        const result = await resendVerificationCode(email, purpose);

        if (!result.success) {
            return res.status(500).json({ 
                success: false,
                message: "Failed to resend verification code",
                error: result.error
            });
        }

        return res.status(200).json({ 
            success: true,
            message: "Verification code resent successfully"
        });

    } catch (error) {
        console.error('Resend OTP Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }


}; 

module.exports = {
    initialRegistration,
    finalRegisteration,
    validateUser,
    logoutUser,
    uploadProfilePicture,
    removeProfilePicture,
    updateUserEmail,
    verificationMailSend,
    verificationMailVerify,
    forgetPasswordChange,
    resendOtp
};