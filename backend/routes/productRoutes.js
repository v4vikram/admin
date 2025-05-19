const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validate = require("../middlewares/validate");
const ProductController = require("../controllers/ProductController");
const ProductCategoryController = require("../controllers/ProductCategoryController");
const upload = require("../middlewares/upload");



router.post("/create", upload.any(), ProductController.create);
router.get("/list", ProductController.index);

router.post("/category/create", upload.any(), ProductCategoryController.create);
router.post("/category/sub/create", upload.any(), ProductCategoryController.createSubCat);
router.get("/category/list", ProductCategoryController.index);
router.get("/category/sub/list", ProductCategoryController.subIndex);

router.get("/category/edit/:id", ProductCategoryController.edit);


module.exports = router;
