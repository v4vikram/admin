const mongoose = require("mongoose");



const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  content: String,
  featuredImage:String,
  // mainCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  // subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

  keywords: String,
  slug: { type: String, unique: true },
  status: {
    type: String,
    enum: ["published", "draft", "pending"],
    default: "draft",
  },
  featuredImage: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
