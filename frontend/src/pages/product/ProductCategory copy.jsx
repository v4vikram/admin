import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Breadcrumb,
  GlobalTable,
  LinkButton,
  SingleImageUploader,
} from "../../components";
import { useState } from "react";
import { useGetCustomerQuery } from "../../features/customer/customerApi";
import { Link } from "react-router-dom";
import { PenIcon, Trash2 } from "lucide-react";
import { useRef } from "react";
import { useCreateCategoryMutation } from "../../features/product/productApi";

// ✅ Yup validation schema
const CategorySchema = Yup.object().shape({
  categoryName: Yup.string().required("Category Name is required"),
  // subCategoryName: Yup.string().required("Subcategory Name is required"),
});

const ProductCategory = () => {
  const [catFile, setCatFile] = useState(null);
  const [subCatFile, setSubCatFile] = useState(null);
  const gridRef = useRef(null);
  const [createCategory] = useCreateCategoryMutation();
  const { data } = useGetCustomerQuery();

  console.log("========>", catFile);

  const rowData = (data?.customers || []).map((customer, index) => ({
    _id: customer._id,
    name: customer.contactPerson || customer.companyName || "Unknown",
    contactPerson: customer.contactPerson || "N/A",
    salesPerson: customer.allocatedTo || "none",
    isNew: customer.isNew || false,
    email: customer.email || "N/A",
    companyName: customer.companyName || "N/A",
    productName: customer.remarks || "none",
    phone: customer.phoneNumber || "N/A",
    city: customer.city || "N/A",
    state: customer.state || "N/A",
    country: customer.country || "N/A",
    assignTo: customer.allocatedTo || "none",
    visitDate: customer.visitDate || null,
    inTime: customer.inTime || "N/A",
    outTime: customer.outTime || "N/A",
    remarks: customer.remarks || "none",
    created: new Date(customer.createdAt).toLocaleDateString(),
    updated: new Date(customer.updatedAt).toLocaleDateString(),
    status: customer.status || "new",
    reason: customer.reason || "none",
  }));

  const [columnDefs] = useState([
    { field: "id", headerName: "ID" },
    {
      field: "categoryName",
      headerName: "Category Name",
    },
    {
      field: "subCategoryName",
      headerName: "Sub Category Name",
    },
    { field: "created", headerName: "Created" },
    { field: "updated", headerName: "Updated" },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params) => (
        <div className="space-x-2 flex items-center">
          <Link
            to={`/dashboard/customer-management/customer/edit/${params.data._id}`}
          >
            <PenIcon className="w-4 h-4" />
          </Link>
          <button
            className=""
            // onClick={() => handleDelete(params.data._id)}
          >
            <Trash2 />
          </button>
        </div>
      ),
    },
  ]);

const onSubmit = async (values) => {
  const formData = new FormData();
  formData.append("categoryName", values.categoryName);
  formData.append("subCatName", values.subCatName || "");

  if (catFile) {
    formData.append("categoryImage", catFile);
  }

  if (subCatFile) {
    formData.append("subCatImage", subCatFile);
  }

  try {
    const res = await createCategory(formData)
    // const data = await res.json();
    console.log("Response:", res);
  } catch (error) {
    console.error("Error:", error);
  }
};
  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb
          paths={["dashboard", "Product Management", "Category", "Create"]}
        />
        <div className="flex items-center mb-2 gap-x-2">
          <LinkButton url={`/dashboard/customer-management/customer/visit`}>
            Add Customer
          </LinkButton>
        </div>
      </div>

      <Formik
        initialValues={{ categoryName: "", subCategoryName: "" }}
        validationSchema={CategorySchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          // resetForm();
        }}
        
      >
        {() => (
          <div className="bg-secondary-gray p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-font-200">
              Create Category
            </h2>
            <Form className="grid grid-cols-2 gap-x-4" encType="multipart/form-data">
              {/* Category Name */}
              <div className="mb-4">
                <Field
                  name="categoryName"
                  placeholder="Category Name"
                  className="w-full border p-2 rounded border-border-gray"
                />
                <ErrorMessage
                  name="categoryName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <SingleImageUploader setFileName={setCatFile} />
              </div>
              {/* Subcategory Name */}
              <div className="mb-4">
                <Field
                  name="subCatName"
                  placeholder="Subcategory Name"
                  className="w-full border p-2 rounded border-border-gray"
                />
                <ErrorMessage
                  name="subCatName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <SingleImageUploader setFileName={setSubCatFile} />
              </div>

              {/* Submit */}

              <button
                type="submit"
                className="px-4 py-2 bg-border-gray text-font-200 rounded mt-2 cursor-pointer"
              >
                Create
              </button>
            </Form>
          </div>
        )}
      </Formik>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4 text-font-200">
          Category list
        </h2>
        <GlobalTable
          rowData={rowData}
          columnDefs={columnDefs}
          classname={"h-[80vh]"}
          gridRef={gridRef}
        />
      </div>
    </div>
  );
};

export default ProductCategory;
