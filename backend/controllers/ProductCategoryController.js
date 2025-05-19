const Category = require("../models/CategoryModel");
const SubCategory = require("../models/SubCategoryModel");

// Category
exports.create = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const categoryImage = req?.files?.find(
      (f) => f.fieldname === "categoryImage"
    );

    // ✅ Validate input
    if (!categoryName) {
      return res.status(400).json({
        message: "category name  are required",
      });
    }

    // ✅ Check for duplicate category
    const existingCat = await Category.findOne({ categoryName });

    if (existingCat) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // ✅ Create or find category
    let category = await Category.findOne({ categoryName });

    if (!category) {
      category = await Category.create({
        categoryName,
        categoryImage: categoryImage?.filename || null,
      });
    }

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
exports.edit = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.index = async (req, res) => {
  try {
    const allCat = await Category.find();

    return res.status(201).json({
      allCat,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
exports.subIndex = async (req, res) => {
  try {
    const allCat = await SubCategory.find();

    return res.status(201).json({
      allCat,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
exports.createSubCat = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { subCatName, category } = req.body;
    const subCatImage = req?.files?.find((f) => f.fieldname === "subCatImage");

    // ✅ Check for duplicate subcategory
    const existingSub = await SubCategory.findOne({ subCatName });

    if (existingSub) {
      return res.status(400).json({ message: "SubCategory already exists" });
    }

    // ✅ Create subcategory linked to category
    const subCategory = await SubCategory.create({
      subCatName,
      subCatImage: subCatImage?.filename || null,
      parentCatId: category,
    });

    return res.status(201).json({
      message: "SubCategory created successfully",
      subCategory,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
