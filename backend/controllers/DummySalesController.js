const Sales = require("../models/SalesModel");

exports.create = async (req, res) => {
  try {
    const { name, email, phone, location } = req.body;

    const newLead = new Sales({
      name,
      email,
      phone,
      location,
    });

    await newLead.save();

    res.status(201).json({
      message: "Lead created successfully",
      lead: newLead,
    });
  } catch (error) {
    console.error("Error creating Lead:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.index = async (req, res) => {
  try {
    const allLeads = await Sales.find();
    console.log("All Leads:", allLeads);

    if (!allLeads || allLeads.length === 0) {
      return res.status(404).json({ message: "No Leads found" });
    }

    res
      .status(200)
      .json({ message: "Leads fetched successfully", leads: allLeads });
  } catch (error) {
    console.error("Error fetching Leads:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.edit = async (req, res) => {
  try {
    const allLeads = await Sales.findById(req.params.id);

    if (!allLeads || allLeads.length === 0) {
      return res.status(404).json({ message: "No Leads found" });
    }

    res
      .status(200)
      .json({ message: "Leads fetched successfully", leads: allLeads });
  } catch (error) {
    console.error("Error fetching Leads:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.update = async (req, res) => {
  try {
    console.log("Update Request body:", req.body);
    const { name, email, phone, location, source, isNew, status, assignedTo, reason, productName } = req.body;

    const updatedLead = await Sales.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        productName,
        location,
        source,
        isNew,
        status,
        assignedTo,
        reason,
        updatedAt: new Date()
      },
      { new: true } // return the updated document
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({
      message: "Lead updated successfully",
      lead: updatedLead,
    });
  } catch (error) {
    console.error("Error updating Lead:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

