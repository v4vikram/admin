const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  companyName: { type: String },
  address: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  pinCode: { type: String },
  phoneNumber: { type: String },
  alternatePhoneNumber: { type: String },
  email: { type: String },
  alternateEmail: { type: String },
  contactPerson: { type: String },
  inTime: { type: String },
  outTime: { type: String },
  visitDate: { type: Date },
  remarks: { type: String },
  allocatedTo: { type: String }
}, {
  timestamps: true,
});


module.exports = mongoose.model("customer", customerSchema);


