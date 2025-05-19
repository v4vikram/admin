const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validate = require("../middlewares/validate");
const CustomerController = require("../controllers/CustomerController");




router.post("/create", CustomerController.create);
router.get("/edit/:id", CustomerController.edit);
router.put("/edit/:id", CustomerController.update);
router.get("/list", CustomerController.index);



module.exports = router;
