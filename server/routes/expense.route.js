const { Router } = require("express");
const { registerExpense } = require('../controllers/expenses.controller.js');
const { verifyToken } = require('../middleware/authentication.middleware.js');

const router = Router();

router.route("/register").post(verifyToken, registerExpense);

module.exports = router;