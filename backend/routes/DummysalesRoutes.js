const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validate = require("../middlewares/validate");
const SalesController = require("../controllers/SalesController");


const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),
});

// router.post("/create", validate(userSchema), SalesController.create);
router.post("/create", SalesController.create);
router.put("/update/:id", SalesController.update);
router.get("/list", SalesController.index);
router.get("/edit/:id", SalesController.edit);



module.exports = router;
