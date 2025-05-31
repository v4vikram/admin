const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  content: String,
  mainCategory: String,
  subCategory: String,
  keywords: String,
  slug: { type: String, unique: true },
  status: { type: String, enum: ["published", "draft", "pending"], default: "draft" },
  featuredImage: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
