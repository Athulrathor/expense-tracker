const { Router } = require("express");
const { validateUser, logoutUser, uploadProfilePicture, removeProfilePicture, updateUserEmail, verificationMailSend, forgetPasswordChange, verificationMailVerify, initialRegistration, finalRegisteration, resendOtp } = require("../controllers/user.controller.js");
const {verifyToken } = require('../middleware/authentication.middleware.js');
const upload = require('../middleware/upload.middleware.js');

const router = Router();

// Registrations
router.route("/initial-register").post(initialRegistration);
router.route("/final-register").post(finalRegisteration);

// Log in & Log out
router.route("/validate").post(validateUser);
router.route("/logout").post(logoutUser);

// Email Verifications
router.route("/send-mail").post(verificationMailSend);
router.route("/verify-mail").post(verificationMailVerify);

// Forget Password
router.route("/change-password").patch( forgetPasswordChange);

// Resend OTP
router.route("/resend-otp").post(resendOtp);

// Home
router.route('/home').get(verifyToken, (req, res) => {
    res.status(200).json({ message: "User logged in successfully!", user: req.user, success: true });
})

// Update
router.patch('/upload-avatar', verifyToken, upload.single('avatar'), uploadProfilePicture);
router.patch('/delete-avatar', verifyToken, removeProfilePicture);
router.patch('/user-email', verifyToken, updateUserEmail);

module.exports = router;