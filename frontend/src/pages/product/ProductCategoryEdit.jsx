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

import { Link, useParams } from "react-router-dom";
import { PenIcon, Trash2 } from "lucide-react";
import { useRef } from "react";
import {
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useGetCatByIdQuery,
  useGetCatListQuery,
  useGetSubCatListQuery,
} from "../../features/product/productApi";
import { useEffect } from "react";

// ✅ Yup validation schema
const CategorySchema = Yup.object().shape({
  categoryName: Yup.string().required("Category Name is required"),
  // subCategoryName: Yup.string().required("Subcategory Name is required"),
});

const ProductCategory = () => {
  const { id } = useParams();
  const gridRef = useRef(null);
  const [catFile, setCatFile] = useState(null);
  const [filePreview, setFilePrview] = useState(null);
  const [subCatFile, setSubCatFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  const [createCategory] = useCreateCategoryMutation();
  const [createSubCategory] = useCreateSubCategoryMutation();
  const { data: category, isLoading, error } = useGetCatByIdQuery(id);

  const { data } = useGetCatListQuery();
  const {
    data: subCategories,
    isLoading: isSubCategoriesLoading,
    error: subCategoriesError,
  } = useGetSubCatListQuery();

  const rowData = (categories || []).map((category, index) => ({
    _id: category._id,
    categoryName: category.categoryName || "N/A",
    categoryImage: category.categoryImage || "N/A",
    created: new Date(category.createdAt).toLocaleDateString(),
    updated: new Date(category.updatedAt).toLocaleDateString(),
  }));

  const rowData2 = (subCategories?.allCat || []).map((category, index) => ({
    _id: category?._id,
    subCatName: category?.subCatName,
    subCatImage: category?.subCatImage,
    created: new Date(category?.createdAt).toLocaleDateString(),
    updated: new Date(category?.updatedAt).toLocaleDateString(),
  }));

  // console.log("rowData ========>", rowData);
  const [columnDefs] = useState([
    { field: "_id", headerName: "ID" },
    {
      field: "categoryName",
      headerName: "Category Name",
    },
    {
      field: "categoryImage",
      headerName: "Category Image",
      cellRenderer: (params) =>
        params.value ? (
          <img
            src={`http://localhost:9000/uploads/products/${params.value}`}
            alt="Category"
            className="w-10 h-8 object-contain"
            onError={(e) => (e.target.src = "/fallback.png")} // Optional fallback
          />
        ) : (
          "N/A"
        ),
    },
    { field: "created", headerName: "Created" },
    { field: "updated", headerName: "Updated" },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params) => (
        <div className="space-x-2 flex items-center">
          <Link to={`/dashboard/product/category/edit/${params.data._id}`}>
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
  const [columnDefs2] = useState([
    { field: "_id", headerName: "ID" },
    {
      field: "subCatName",
      headerName: "Sub Category Name",
    },
    {
      field: "subCatImage",
      headerName: "Sub Category Image",
      cellRenderer: (params) =>
        params.value ? (
          <img
            src={`http://localhost:9000/uploads/products/${params.value}`}
            alt="Category"
            className="w-10 h-8 object-contain"
            onError={(e) => (e.target.src = "/fallback.png")} // Optional fallback
          />
        ) : (
          "N/A"
        ),
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

  useEffect(() => {
    setCategories(data?.allCat);
  }, [data]);

  useEffect(() => {
    setImageUrl(category?.category?.categoryImage);
  }, [category]);

  console.log("imageUrl", imageUrl);
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

      <div className="flex gap-4">
        <Formik
          initialValues={{ categoryName: category?.category?.categoryName }}
          enableReinitialize={true}
          validationSchema={CategorySchema}
          onSubmit={async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append("categoryName", values.categoryName);

            if (catFile) {
              formData.append("categoryImage", catFile);
            }

            try {
              const res = await createCategory(formData);
              // const data = await res.json();
              console.log("Response:", res);
            } catch (error) {
              console.error("Error:", error);
            }
            // resetForm();
          }}
        >
          {() => (
            <div className="bg-secondary-gray p-6 rounded-lg shadow-md flex-1">
              <h2 className="text-xl font-semibold mb-2 text-font-200">
                Parent Category
              </h2>
              <Form
                className="grid grid-cols-1 gap-x-4"
                encType="multipart/form-data"
              >
                {/* Category Name */}
                <div className="mb-4">
                  <Field
                    name="categoryName"
                    placeholder="Category Name"
                    className="w-full border p-2 rounded-lg border-border-gray"
                  />
                  <ErrorMessage
                    name="categoryName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <SingleImageUploader
                    setFileName={setCatFile}
                    setFilePrview={setFilePrview}
                    initialImage={`http://localhost:9000/uploads/products/${imageUrl}`}
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-border-gray text-font-200 rounded-lg mt-2 cursor-pointer w-fit"
                >
                  Create
                </button>
              </Form>
            </div>
          )}
        </Formik>

        <Formik
          initialValues={{ subCatName: "" }}
          onSubmit={async (values, { resetForm }) => {
            console.log("values", values);

            const formData = new FormData();
            formData.append("subCatName", values.subCatName || "");

            if (subCatFile) {
              formData.append("subCatImage", subCatFile);
            }

            formData.append("parentCatId", values.category || "");

            try {
              const res = await createSubCategory(formData);
              console.log("Response:", res);
            } catch (error) {
              console.error("Error:", error);
            }

            // resetForm();
          }}
        >
          {() => (
            <div className="bg-secondary-gray p-6 rounded-lg shadow-md flex-1">
              <h2 className="text-xl font-semibold mb-2 text-font-200">
                Child Category
              </h2>
              <Form
                className="grid grid-cols-1 gap-x-4"
                encType="multipart/form-data"
              >
                {/* Subcategory Name */}
                <div className="mb-4">
                  <Field
                    name="subCatName"
                    placeholder="Subcategory Name"
                    className="w-full border p-2 rounded-lg border-border-gray"
                  />
                  <ErrorMessage
                    name="subCatName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="parentCatId" className="text-font-200">
                    Category
                  </label>

                  <Field
                    as="select"
                    name="parentCatId"
                    className="custom-select w-full border p-2 rounded-lg border-border-gray"
                    disabled={categories ? false : true}
                  >
                    <option value={"Parent Category"} className="text-font-200">
                      Select Parent Category
                    </option>
                    {categories?.map((opt) => (
                      <option key={opt._id} value={opt._id}>
                        {opt.categoryName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="parentCatId"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <SingleImageUploader setFileName={setSubCatFile} />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-border-gray text-font-200 rounded-lg mt-2 cursor-pointer w-fit"
                >
                  Create
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>

      <div className="mt-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2 text-font-200">
              Parent List
            </h2>
            <GlobalTable
              rowData={rowData}
              columnDefs={columnDefs}
              classname={"h-[50vh]"}
              gridRef={gridRef}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2 text-font-200">
              Child List
            </h2>
            <GlobalTable
              rowData={rowData2}
              columnDefs={columnDefs2}
              classname={"h-[50vh]"}
              gridRef={gridRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
