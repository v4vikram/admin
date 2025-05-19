import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateCustomerMutation } from "../../features/customer/customerApi";

const initialValues = {
  companyName: "",
  address: "",
  country: "India",
  state: "",
  city: "",
  pinCode: "",
  phoneNumber: "",
  altPhoneNumber: "",
  email: "",
  altEmail: "",
  contactPerson: "",
  inTime: "",
  outTime: "",
  visitDate: "",
  allocatedTo: "",
  remarks: "",
};

const validationSchema = Yup.object({
  companyName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  pinCode: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  contactPerson: Yup.string().required("Required"),
  inTime: Yup.string().required("Required"),
  outTime: Yup.string().required("Required"),
  visitDate: Yup.string().required("Required"),
  allocatedTo: Yup.string().required("Required"),
  remarks: Yup.string().required("Required"),
});

const CustomerVisit = () => {
  const [createCustomer] = useCreateCustomerMutation();
  const handleSubmit = async (values) => {
    const res = await createCustomer(values).unwrap();
    console.log(res);
    if (res) {
      alert("Customer visit created successfully");
    } else {
      alert("Failed to create customer visit");
    }
   
  };

  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-font-200">Company Name *</label>
            <Field name="companyName" className="w-full border p-2 rounded mb-0 border-border-gray" />
            <ErrorMessage name="companyName" className="text-red-500" component="div" />
          </div>

          <div>
            <label className="text-font-200">Address *</label>
            <Field name="address" className="w-full border p-2 rounded mb-0 border-border-gray" />
            <ErrorMessage name="address" className="text-red-500" component="div" />
          </div>

          <div>
            <label className="text-font-200">Country *</label>
            <Field as="select" name="country" className="w-full border p-2 rounded mb-0 border-border-gray text-font-200">
              <option value="India">India</option>
              {/* Add more countries if needed */}
            </Field>
            <ErrorMessage name="country" className="text-red-500" component="div" />
          </div>

          <div>
            <label className="text-font-200">State *</label>
            <Field name="state" className="w-full border p-2 rounded mb-0 border-border-gray" />
            <ErrorMessage name="state" className="text-red-500" component="div" />
          </div>

          <div>
            <label className="text-font-200">City *</label>
            <Field name="city" className="w-full border p-2 rounded mb-0 border-border-gray" />
            <ErrorMessage name="city" className="text-red-500" component="div" />
          </div>

          <div>
            <label className="text-font-200">Pin Code *</label>
            <Field name="pinCode" className="w-full border p-2 rounded mb-0 border-border-gray" />
            <ErrorMessage name="pinCode" className="text-red-500" component="div" />
          </div>

          <div>
            <label className="text-font-200">Phone Number *</label>
            <Field name="phoneNumber" className="w-full border p-2 rounded mb-0 border-border-gray" />
            <ErrorMessage name="phoneNumber" className="text-red-500" component="div" />
          </div>

          <div>
            <label className="text-font-200">Alternate Phone Number</label>
            <Field name="altPhoneNumber" className="w-full border p-2 rounded mb-0 border-border-gray" />
          </div>

          <div>
            <label className="text-font-200">Email ID *</label>
            <Field name="email" type="email" className="w-full border p-2 rounded mb-0 border-border-gray" />
            <ErrorMessage name="email" className="text-red-500" component="div" />
          </div>

          <div>
            <label className="text-font-200">Alternate Email ID</label>
            <Field name="altEmail" type="email" className="w-full border p-2 rounded mb-0 border-border-gray" />
          </div>

          <div>
            <label className="text-font-200">Contact Person Name *</label>
            <Field name="contactPerson" className="w-full border p-2 rounded mb-0 border-border-gray" />
            <ErrorMessage name="contactPerson" className="text-red-500" component="div" />
          </div>

          <div>
            <label className="text-font-200">In Time *</label>
            <Field name="inTime" type="time" className="w-full border p-2 rounded mb-0 border-border-gray" />
            <ErrorMessage name="inTime" className="text-red-500" component="div" />
          </div>

          <div>
            <label className="text-font-200">Out Time *</label>
            <Field name="outTime" type="time" className="w-full border p-2 rounded mb-0 border-border-gray custom-date-picker" />
            <ErrorMessage name="outTime" className="text-red-500" component="div" />
          </div>

          <div>
            <label className="text-font-200">Visit Date *</label>
            <Field name="visitDate" type="date" className="w-full border p-2 rounded mb-0 border-border-gray custom-date-picker" />
            <ErrorMessage name="visitDate" className="text-red-500" component="div" />
          </div>

          <div>
            <label className="text-font-200">Allocated To *</label>
            <Field as="select" name="allocatedTo" className="w-full border p-2 rounded mb-0 border-border-gray text-font-200">
              <option value="">Select SalesPerson</option>
              <option value="John">John</option>
              <option value="Alice">Alice</option>
              <option value="David">David</option>
            </Field>
            <ErrorMessage name="allocatedTo" className="text-red-500" component="div" />
          </div>

          <div className="md:col-span-3">
            <label className="text-font-200">Remarks *</label>
            <Field as="textarea" name="remarks" className="w-full border p-2 rounded mb-0 border-border-gray text-font-200" />
            <ErrorMessage name="remarks" className="text-red-500" component="div" />
          </div>

          <div className="md:col-span-3">
            <button type="submit" className="bg-secondary-gray text-font-200 py-2 px-6 rounded-full cursor-pointer">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CustomerVisit;
