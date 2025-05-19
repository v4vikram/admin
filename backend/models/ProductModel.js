const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    shortDescription: { type: String },
    featuredImage: { type: String },
    productFeatures: [
      {
        title: { type: String },
        featureImage: { type: String }, // optional
      },
    ],
    stock: { type: Number },
    stockStatus: {
      type: String,
      enum: ["in-stock", "out-of-stock", "pre-order"],
      default: "in-stock",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    datasheetUrl: { type: String },
    diagramUrl: { type: String },
    userManualUrl: { type: String },
    slug: { type: String, unique: true },
    status: {
      type: String,
      enum: ["published", "draft", "pending"],
      default: "draft",
    },

    isBestSeller: { type: Boolean, default: false },
    isFeaturedProduct: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
