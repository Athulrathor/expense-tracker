const express = require("express");
const {verifyToken} = require("../middleware/authentication.middleware.js");
const {registerCategory, getAllCategory, updateCategory, deleteCategory} = require("../controllers/category.controller.js");


const router = express.Router();

router.use(verifyToken);

router.post("/register", registerCategory);

router.get("/get-categories", getAllCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;