const { Router } = require("express");
const { registerExpense, getAllExpense, UpdateExpense, deleteExpense, getExpenseById, bulkCreateExpense, searchExpense, getReceipt, exportExpenseDoc } = require('../controllers/expenses.controller.js');
const { verifyToken } = require('../middleware/authentication.middleware.js');

const router = Router();

router.use(verifyToken);

router.route("/register").post(registerExpense);

router.get("/:id", getExpenseById);

router.get("/get-expenses", getAllExpense);

router.post("/bulk", bulkCreateExpense);

router.get("/search", searchExpense);

router.put("/:id", UpdateExpense);

router.delete("/:id", deleteExpense);

router.post("/:id/receipt", getReceipt);

router.get("/export", exportExpenseDoc);

module.exports = router;