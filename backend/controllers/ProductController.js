const Product = require("../models/ProductModel");


exports.create = async (req, res) => {
  try {
    const {
      title,
      category,
      slug,
      price,
      stock,
      sold,
      datasheetUrl,
      diagramUrl,
      userManualUrl,
      categoryId,
      subCategoryId,
      technicalSpecification,
    } = req.body;

    console.log("req.body", req.body);

    // Check product exists
    const isExists = await Product.findOne({ title });
    // if (isExists) {
    //   return res.status(400).json({ message: "Product already exists" });
    // }

    // Featured Image
    const featuredImageFile = req.files.find(
      (f) => f.fieldname === "FeaturedImage"
    );

    const productFeatures2 = req.body.productFeatures.map((f, i) => {
      const imageKey = `productFeatures[${i}][featureImage]`;
      const imageFile = req.files.find((file) => file.fieldname === imageKey);

      return {
        title: f.title || "", // get title directly from parsed object
        featureImage: imageFile
          ? `uploads/products/features/${imageFile.filename}`
          : null,
      };
    });

    // 🧠 Parse technicalSpecification (if passed as JSON string)
    let techSpecs = [];
    try {
      techSpecs = JSON.parse(technicalSpecification || "[]");
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Invalid technicalSpecification format" });
    }

    const product = await Product.create({
      title,
      slug,
      category,
      price,
      stock,
      sold,
      categoryId,
      subCategoryId,
      datasheetUrl,
      diagramUrl,
      userManualUrl,
      featuredImage: featuredImageFile?.filename,
      technicalSpecification: techSpecs,
      productFeatures: productFeatures2,
    });

    res.status(201).json({ message: "Product Created Successfully", product });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.index = async (req, res) => {
  try {
    const products = await Product.find(); // You can add .populate() or .select() if needed
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

