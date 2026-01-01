const { Router } = require("express");
const { registerIncome, getAllIncome, updateIncome, deleteIncome, getIncomeById, bulkCreateIncome, searchIncome, exportIncomeDoc, incomeSource } = require('../controllers/income.controller.js');
const { verifyToken } = require('../middleware/authentication.middleware.js');

const router = Router();

router.use(verifyToken);

router.route("/register").post(registerIncome);

router.get("/:id", getIncomeById);

router.get("/get-incomes", getAllIncome);

router.put("/:id", updateIncome);

router.delete("/:id", deleteIncome);

router.post("/bulk", bulkCreateIncome);

router.get("/search", searchIncome);

router.get("/source", incomeSource);

router.get("/export", exportIncomeDoc);

module.exports = router;