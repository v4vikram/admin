const Customer = require("../models/customerModel");

exports.create = async (req, res) => {
  try {
    const {
      companyName,
      address,
      country,
      state,
      city,
      pinCode,
      phoneNumber,
      alternatePhoneNumber,
      email,
      alternateEmail,
      contactPerson,
      inTime,
      outTime,
      visitDate,
      remarks,
      allocatedTo, // should be the ObjectId of a SalesPerson
    } = req.body;

    const newCustomer = new Customer({
      companyName,
      address,
      country,
      state,
      city,
      pinCode,
      phoneNumber,
      alternatePhoneNumber,
      email,
      alternateEmail,
      contactPerson,
      inTime,
      outTime,
      visitDate,
      remarks,
      allocatedTo,
    });

    await newCustomer.save();

    res.status(201).json({
      message: "Customer lead created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    console.error("Error creating customer lead:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.index = async (req, res) => {
  try {
    const allCustomer = await Customer.find();
    console.log("All Customer:", allCustomer);

    if (!allCustomer || allCustomer.length === 0) {
      return res.status(404).json({ message: "No Customer found" });
    }

    res
      .status(200)
      .json({
        message: "Customer fetched successfully",
        customers: allCustomer,
      });
  } catch (error) {
    console.error("Error fetching Customer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.edit = async (req, res) => {
  try {
    const allCustomer = await Customer.findById(req.params.id);

    if (!allCustomer || allCustomer.length === 0) {
      return res.status(404).json({ message: "No Customer found" });
    }

    res
      .status(200)
      .json({
        message: "Customer fetched successfully",
        customer: allCustomer,
      });
  } catch (error) {
    console.error("Error fetching Customer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.update = async (req, res) => {
  try {
    console.log("Update Request body:", req.body);

    const {
      companyName,
      address,
      country,
      state,
      city,
      pinCode,
      phoneNumber,
      altPhoneNumber,
      email,
      altEmail,
      contactPerson,
      inTime,
      outTime,
      visitDate,
      remarks,
      allocatedTo,
    } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        companyName,
        address,
        country,
        state,
        city,
        pinCode,
        phoneNumber,
        altPhoneNumber,
        email,
        altEmail,
        contactPerson,
        inTime,
        outTime,
        visitDate,
        remarks,
        allocatedTo,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating Customer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
