const { Router } = require("express");
const { registerExpense, getAllExpense, UpdateExpense, deleteExpense } = require('../controllers/expenses.controller.js');
const { verifyToken } = require('../middleware/authentication.middleware.js');

const router = Router();

router.use(verifyToken);

router.route("/register").post(registerExpense);

router.get("/get-expenses", getAllExpense);

router.put("/:id", UpdateExpense);

router.delete("/:id", deleteExpense);

module.exports = router;