const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String },
    categorySlug: { type: String },
    categoryImage: { type: String }, // Store filename or full URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);