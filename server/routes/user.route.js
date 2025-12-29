const { Router } = require("express");
const { validateUser, logoutUser, uploadProfilePicture, removeProfilePicture, updateUserEmail, verificationMailSend, forgetPasswordChange, verificationMailVerify, initialRegistration, finalRegisteration, resendOtp, resetRefreshToken } = require("../controllers/user.controller.js");
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

// RESET ACCESS TOKEN
router.route("/refresh").post(resetRefreshToken);

// Home
router.route('/home').get(verifyToken, (req, res) => {
    res.status(200).json({ message: "User logged in successfully!", user: req.user, success: true });
})

// Update
router.patch('/upload-avatar', verifyToken, upload.single('avatar'), uploadProfilePicture);
router.patch('/delete-avatar', verifyToken, removeProfilePicture);
router.patch('/user-email', verifyToken, updateUserEmail);

module.exports = router;

/*

Analytics APIs
GET    /api/v1/analytics/summary           - Get spending summary
GET    /api/v1/analytics/income-summary    - Get income summary
GET    /api/v1/analytics/cash-flow         - Get cash flow analysis
GET    /api/v1/analytics/trends            - Get spending trends
GET    /api/v1/analytics/income-trends     - Get income trends
GET    /api/v1/analytics/category-breakdown - Category-wise analysis
GET    /api/v1/analytics/comparison        - Period comparison
GET    /api/v1/analytics/net-savings       - Net savings calculation
GET    /api/v1/analytics/financial-health  - Financial health score
GET    /api/v1/analytics/predictions       - AI-based predictions

*/