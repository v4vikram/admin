// const Blog = require("../models/blogModel");
// const fs = require("fs");
// const path = require("path");
const Category = require("../models/CategoryModel");
const slugify = require("slugify");


exports.create = async (req, res) => {
 
   try {
     const { categoryName, parent } = req.body;
     console.log("req.files", req.files)
    
     const categoryImage = req.files?.[0]?.filename || "";
 
     const categorySlug = slugify(categoryName, { lower: true, strict: true });
 
     const newCategory = new Category({
       categoryName,
        categorySlug,
       categoryImage,
       parent: parent || null, // null for main, ObjectId for sub
     });
 
     await newCategory.save();
 
     res.status(201).json({ success: true, category: newCategory });
   } catch (error) {
     res.status(400).json({ success: false, message: error.message });
   }
};

// exports.index = async (req, res) => {
//   try {
//     const allCustomer = await Customer.find();
//     console.log("All Customer:", allCustomer);

//     if (!allCustomer || allCustomer.length === 0) {
//       return res.status(404).json({ message: "No Customer found" });
//     }

//     res.status(200).json({
//       message: "Customer fetched successfully",
//       customers: allCustomer,
//     });
//   } catch (error) {
//     console.error("Error fetching Customer:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// exports.edit = async (req, res) => {
//   try {
//     const allCustomer = await Customer.findById(req.params.id);

//     if (!allCustomer || allCustomer.length === 0) {
//       return res.status(404).json({ message: "No Customer found" });
//     }

//     res.status(200).json({
//       message: "Customer fetched successfully",
//       customer: allCustomer,
//     });
//   } catch (error) {
//     console.error("Error fetching Customer:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// exports.update = async (req, res) => {
//   try {
//     console.log("Update Request body:", req.body);

//     const {
//       companyName,
//       address,
//       country,
//       state,
//       city,
//       pinCode,
//       phoneNumber,
//       altPhoneNumber,
//       email,
//       altEmail,
//       contactPerson,
//       inTime,
//       outTime,
//       visitDate,
//       remarks,
//       allocatedTo,
//     } = req.body;

//     const updatedCustomer = await Customer.findByIdAndUpdate(
//       req.params.id,
//       {
//         companyName,
//         address,
//         country,
//         state,
//         city,
//         pinCode,
//         phoneNumber,
//         altPhoneNumber,
//         email,
//         altEmail,
//         contactPerson,
//         inTime,
//         outTime,
//         visitDate,
//         remarks,
//         allocatedTo,
//         updatedAt: new Date(),
//       },
//       { new: true }
//     );

//     if (!updatedCustomer) {
//       return res.status(404).json({ message: "Customer not found" });
//     }

//     res.status(200).json({
//       message: "Customer updated successfully",
//       customer: updatedCustomer,
//     });
//   } catch (error) {
//     console.error("Error updating Customer:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
