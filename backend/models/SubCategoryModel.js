const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    subCatName: { type: String },
    subCatImage: { type: String }, // Store filename or full URL
    parentCatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);