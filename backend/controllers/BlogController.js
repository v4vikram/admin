const Blog = require("../models/blogModel");
const fs = require("fs");
const path = require("path");

exports.create = async (req, res) => {
  console.log("req.body, featuredImage", req.body);
  try {
    const {
      title,
      description,
      content,
      mainCategory,
      subCategory,
      keywords,
      slug,
      status,
    } = req.body;

    const featuredImage = req?.files ? req?.files[0]?.filename : null;

    console.log("req.body, featuredImage", req?.files);
    // return
    const newBlog = new Blog({
      title,
      description,
      content,
      mainCategory,
      subCategory,
      keywords,
      slug,
      status,
      featuredImage,
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.single = async (req, res) => {
  // const id = "6839953311f69ff46a97e1fa";
  const slug = "time-attendance-access-control-system-a-smart-way-to-manage-your-premises";
  try {
    // const blog = await Blog.findById(id);
    // const blog = await Blog.findOne({ _id: id, status: "published" });
    const blog = await Blog.findOne({ slug: slug, status: "published" });
    console.log("All Blog:", blog);

    if (!blog || blog.length === 0) {
      return res.status(201).json({ message: "No Blog in Draft" });
    }

    res.status(200).json({
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.error("Error fetching Blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.index = async (req, res) => {
  try {
    const blogs = await Blog.find();
    console.log("All Blogs:", blogs);

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No Blogs found" });
    }

    res.status(200).json({
      message: "Blogs fetched successfully",
      blogs: blogs,
    });
  } catch (error) {
    console.error("Error fetching Blogs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.edit = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.length === 0) {
      return res.status(404).json({ message: "No Blog found" });
    }

    res.status(200).json({
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.error("Error fetching Blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.update = async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      mainCategory,
      subCategory,
      keywords,
      slug,
      status,
    } = req.body;

    // Handle file upload (featuredImage)
    const featuredImage =
      req?.files && req.files.length > 0 ? req.files[0].filename : undefined; // Use undefined to skip update if no new image is uploaded

    console.log("featuredImage", req.files);
    // Build update object dynamically
    const updateData = {
      title,
      description,
      content,
      mainCategory,
      subCategory,
      keywords,
      slug,
      status,
    };

    if (featuredImage) {
      updateData.featuredImage = featuredImage;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.delete = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete associated featuredImage file if it exists
    if (blog.featuredImage) {
      const imagePath = path.join(
        __dirname,
        "../uploads/blogs/featured",
        blog.featuredImage
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // remove file
      }
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


