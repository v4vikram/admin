const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  altText: { type: String, default: "" },
  type: { type: String, default: "image/jpeg" },
  fileSize: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const tagSchema = new mongoose.Schema({
  tagName: { type: String, required: true, unique: true },
  tagSlug: { type: String, unique: true },
});

const shippingClassSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
  cost: { type: Number, default: 0 },
});

const categorySchema = new mongoose.Schema({
  subCategory: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

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
      type: String,
    },
    subCategoryId: { type: String },

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
    // labels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Label' }],
    // currency: { type: String, },
    // galleryImages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    // discountPrice: { type: Number },

    // weight: { type: Number, default: 0 },
    // length: { type: Number, default: 0 },
    // width: { type: Number, default: 0 },
    // height: { type: Number, default: 0 },
    // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    // subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    // price: { type: Number, },
    // salePrice: { type: Number },

    // color: { type: String },
    // size: { type: String },
    // sku: { type: String, },
    // tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    // shippingClass: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingClass' },
    // freeShipping: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// productSchema.index({ category: 1 });
// productSchema.index({ slug: 1 });
// productSchema.index({ tags: 1 });

module.exports = mongoose.model("Product", productSchema);
