const { Router } = require("express");
const { registerUser, validateUser, logoutUser, uploadProfilePicture, removeProfilePicture, updateUserEmail } = require("../controllers/user.controller.js");
const {verifyToken } = require('../middleware/authentication.middleware.js');
const upload = require('../middleware/upload.middleware.js');

const router = Router();

// Authentications
router.route("/register").post(registerUser);
router.route("/validate").post(validateUser);
router.route("/logout").post(logoutUser);

// home
router.route('/home').get(verifyToken, (req, res) => {
    res.status(200).json({ message: "User logged in successfully!", user: req.user, success: true });
})

// update
router.patch('/upload-avatar', verifyToken, upload.single('avatar'), uploadProfilePicture);
router.patch('/delete-avatar', verifyToken, removeProfilePicture);
router.patch('/user-email', verifyToken, updateUserEmail);

module.exports = router;