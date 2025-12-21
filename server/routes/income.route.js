const { Router } = require("express");
const { registerIncome } = require('../controllers/income.controller.js');
const { verifyToken } = require('../middleware/authentication.middleware.js');

const router = Router();

router.route("/register").post(verifyToken,registerIncome);

module.exports = router;