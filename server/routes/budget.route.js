const { Router } = require("express");
const {verifyToken} = require('../middleware/authentication.middleware.js');
const { registerBudget, getBudgetById, getAllBudget, UpdateBudget, deleteBudget, getBudgetProgress } = require("../controllers/budget.controller.js");


const router = Router();

router.use(verifyToken);

router.route("/register").post(registerBudget);

router.get("/:id", getBudgetById);

router.get("/get-expenses", getAllBudget);

router.put("/:id", UpdateBudget);

router.delete("/:id", deleteBudget);

router.get("/:id/progress", getBudgetProgress);

module.exports =  router;