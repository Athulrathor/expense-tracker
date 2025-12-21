const { Router } = require("express");
const { testController } = require("../controllers/test.controller.js");


const router = Router();

router.route("/testing").get(testController);

module.exports =  router;