const { Router } = require("express");
const { getSpendingSummary, getSpendingTrends, getCategoryBreakdown, getPeriodComparison, getPredictions } = require("../controllers/analytical.controller.js");
const router = Router();

router.use(verifyToken);

router.route('/summary').get(getSpendingSummary);

router.route('/trends').get(getSpendingTrends);

router.route('/category-break-down').get(getCategoryBreakdown);

router.route('/comparison').get(getPeriodComparison);

router.route('/prediction').get(getPredictions);

export default router;
