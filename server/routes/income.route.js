const { Router } = require("express");
const { registerIncome, getAllIncome, updateIncome, deleteIncome } = require('../controllers/income.controller.js');
const { verifyToken } = require('../middleware/authentication.middleware.js');

const router = Router();

router.use(verifyToken);

router.route("/register").post(registerIncome);

router.get("/get-incomes", getAllIncome);

router.put("/:id", updateIncome);

router.delete("/:id", deleteIncome);

module.exports = router;