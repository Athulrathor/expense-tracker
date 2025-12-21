const { Router } = require("express");
const { registerUser, validateUser, logoutUser,uploadProfilePicture } = require("../controllers/user.controller.js");
const {verifyToken } = require('../middleware/authentication.middleware.js');
const upload = require('../middleware/upload.middleware.js');

const router = Router();

router.route("/register").post(upload.single('avatar'),registerUser);

router.route("/validate").post(validateUser);

router.route("/logout").post(logoutUser);

router.route('/home').get(verifyToken, (req, res) => {
    res.status(200).json({ message: "User logged in successfully!", user: req.user, success: true });
})

router.post('/upload-avatar', verifyToken, upload.single('avatar'), uploadProfilePicture);

module.exports = router;