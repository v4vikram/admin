const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validate = require("../middlewares/validate");
const CustomerController = require("../controllers/CustomerController");
const BlogController = require("../controllers/BlogController");
const upload = require("../middlewares/upload");




router.post("/create", upload.any(), BlogController.create);
router.get("/list", BlogController.index);
router.get("/:id", BlogController.single);
router.get("/edit/:id", BlogController.edit);
router.put("/edit/:id",  upload.any(), BlogController.update);
router.delete("/delete/:id", BlogController.delete);



module.exports = router;
