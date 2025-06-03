const express = require("express");
const router = express.Router();
// const Joi = require("joi");
// const validate = require("../middlewares/validate");
// const CustomerController = require("../controllers/CustomerController");
const BlogController = require("../controllers/BlogController");
const BlogCatController = require("../controllers/BlogCatController")
const upload = require("../middlewares/upload");




router.post("/create", upload.any(), BlogController.create);
router.get("/list", BlogController.index);
router.get("/edit/:id", BlogController.edit);
router.put("/edit/:id",  upload.any(), BlogController.update);
router.delete("/delete/:id", BlogController.delete);
// router.get("/category", BlogCatController.index);
router.post("/category/create", upload.any(), BlogCatController.create);
router.get("/:id", BlogController.single);



module.exports = router;
