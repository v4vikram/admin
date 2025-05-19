import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Breadcrumb,
  Editor,
  MultiImageUploader,
  SingleImageUploader,
} from "../../components";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormikContext,
  FieldArray,
} from "formik";
import { CirclePlus } from "lucide-react";
import { productCreateSchema } from "../../utils/validationSchemas";

const productCategory = [
  {
    category: "time attendance and access control",
    subCategories: [
      "Fingerprint Devices",
      "Face Recognition Terminals",
      "Card-based Systems",
    ],
  },
  {
    category: "entrance control",
    subCategories: ["Turnstiles", "Speed Gates", "Full Height Turnstiles"],
  },
  {
    category: "parking and traffic control",
    subCategories: ["Boom Barriers", "Tyre Killers", "Parking Sensors"],
  },
  {
    category: "inspection control",
    subCategories: ["X-Ray Machines", "Metal Detectors", "Baggage Scanners"],
  },
  {
    category: "software and applications",
    subCategories: [
      "Attendance Software",
      "Visitor Management",
      "Payroll Integration",
    ],
  },
  {
    category: "ul listed em locks",
    subCategories: [
      "Standard EM Locks",
      "Waterproof EM Locks",
      "High Holding Force Locks",
    ],
  },
  {
    category: "accessories",
    subCategories: ["Exit Buttons", "Power Supplies", "Brackets & Mounts"],
  },
];

const CreateProduct = () => {
  const [categories, setCategories] = useState(productCategory);
  const [fileName, setFileName] = useState(null);
  console.log("fileName", fileName)
  const initialValues = {
    title: "",
    content: "",
    shortDescription: "",
    category: "",
    subCategory: "",
    price: "",
    salePrice: "",
    FeaturedImage: "",
    galleryImages: [],
    discountPrice: "", // New field for discount
    isBestSeller: false, // New field for Best Seller
    isFeaturedProduct: false, // New field for Best Seller
    currency: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    stock: "",
    stockStatus: "",
    color: "",
    size: "",
    sku: "",
    tags: "",
    shippingClass: "",
    freeShipping: "",
    slug: "",
    labels: "",
    status: "",
  };

  const handleSubmit = async (values, { resetForm, validateForm }) => {
    console.log("values", values);
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("subCategory", values.subCategory);
    formData.append("keywords", values.keywords);
    formData.append("content", values.content);
    formData.append("datasheet", values.datasheet);
    formData.append("connectionDiagram", values.connectionDiagram);
    formData.append("userManual", values.userManual);

    formData.append("featuredImage", values.featuredImage);

    // Features array: stringified data + file
    formData.append(
      "features",
      JSON.stringify(
        values.features.map((feature, index) => ({
          title: feature.title,
          // Here you can store the name of the image (not the actual file)
          image: feature.file ? feature.file.name : null,
        }))
      )
    );

    // Append all files for the features
    values.features.forEach((feature, index) => {
      if (feature.file) {
        formData.append(`featureFile_${index}`, feature.file); // Append the image file
      }
    });

    // Technicals array
    formData.append("technicals", JSON.stringify(values.technicals));

    try {
      const data = await createProduct(formData);
      console.log("data", data);
      toast.success("Product Created");
      // resetForm();
    } catch (err) {
      console.error("Failed to submit product:", err);
    }
  };

  useEffect(() => {
    const handleDragOver = (e) => e.preventDefault();
    window.addEventListener("dragover", handleDragOver);
    return () => window.removeEventListener("dragover", handleDragOver);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={productCreateSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, field, form }) => {
        const selectedCategory = categories.find(
          (cat) => cat.category === values.category
        );

        // console.log(values)
        // console.log(selectedCategory);
     
        return (
          <div>
            <Breadcrumb paths={["dashboard", "Products", "Create Product"]} />
            <Form
              className="mx-auto !text-font-200"
              encType="multipart/form-data"
            >
              <div className="grid grid-cols-4 gap-4">
                {/* left side */}
                <div className="col-span-4 lg:col-span-3 space-y-4 bg-secondary-gray p-3 rounded-md">
                  {/* Product Title */}
                  <div className="mb-4">
                    <Field
                      name="title"
                      placeholder="Product Title"
                      className="w-full border p-2 rounded mb-0 border-border-gray"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm mb-0"
                    />
                  </div>

                  {/* Short Description */}
                  <div>
                    <Field
                      name="shortDescription"
                      as="textarea"
                      placeholder="Short Description"
                      className="w-full border p-2 rounded border-border-gray"
                    />
                    <ErrorMessage
                      name="shortDescription"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Description Editor */}
                  <div className="mt-4">
                    <Editor
                      name="content"
                      value={values.content}
                      onChange={(val) => setFieldValue("content", val)}
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, false] }],
                          ["bold", "italic", "underline", "strike"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link", "image", "video"],
                          ["clean"],
                        ],
                      }}
                      formats={[
                        "header",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "list",
                        "bullet",
                        "link",
                        "image",
                        "video",
                      ]}
                      className="min-h-56"
                    />
                  </div>

                  {/* --- Additional Fields --- */}

                  

                  {/* Currency & Price */}
                  {/* <div className="grid grid-cols-2 gap-4">
                    <Field
                      name="currency"
                      as="select"
                      className="w-full border p-2 rounded border-border-gray"
                    >
                      <option value="">Select Currency</option>
                      <option value="USD">USD</option>
                      <option value="AED">AED</option>
                      <option value="EUR">EUR</option>
                    </Field>

                    <Field
                      name="price"
                      type="number"
                      placeholder="Price"
                      className="w-full border p-2 rounded border-border-gray"
                    />
                  </div> */}

                  {/* Discount & Sales Price */}
                  {/* <div className="grid grid-cols-2 gap-4">
                    <Field
                      name="salePrice"
                      type="number"
                      placeholder="Sales Price (Discounted)"
                      className="w-full border p-2 rounded border-border-gray"
                    />

                    <Field
                      name="discountPrice"
                      type="number"
                      placeholder="Discount Price"
                      className="w-full border p-2 rounded border-border-gray"
                    />
                  </div> */}

                  {/* Weight & Dimensions */}
                  {/* <div className="grid grid-cols-2 gap-4">
                    <Field
                      name="weight"
                      type="number"
                      placeholder="Weight (kg)"
                      className="w-full border p-2 rounded border-border-gray"
                    />

                    <div className="grid grid-cols-3 gap-2">
                      <Field
                        name="length"
                        type="number"
                        placeholder="L"
                        className="border p-2 rounded border-border-gray"
                      />
                      <Field
                        name="width"
                        type="number"
                        placeholder="W"
                        className="border p-2 rounded border-border-gray"
                      />
                      <Field
                        name="height"
                        type="number"
                        placeholder="H"
                        className="border p-2 rounded border-border-gray"
                      />
                    </div>
                  </div> */}

                  {/* Shipping Class & Free Shipping */}
                  {/* <div className="grid grid-cols-2 gap-4">
                    <Field
                      name="shippingClass"
                      as="select"
                      className="w-full border p-2 rounded border-border-gray"
                    >
                      <option value="">Shipping Class</option>
                      <option value="standard">Standard</option>
                      <option value="express">Express</option>
                    </Field>

                    <Field
                      name="freeShipping"
                      as="select"
                      className="w-full border p-2 rounded border-border-gray"
                    >
                      <option value="">Free Shipping?</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </Field>
                  </div> */}

                  {/* Labels / Badges */}
                  {/* <div>
                    <Field
                      name="labels"
                      placeholder="Labels (e.g. New, Best Seller)"
                      className="w-full border p-2 rounded border-border-gray"
                    />
                    <ErrorMessage
                      name="labels"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div> */}

                  {/* Product Gallery */}
                  {/* <div className="mt-4">
                    <h2 className="mb-2">Product Gallery</h2>
                    <MultiImageUploader />
                  </div> */}
                </div>

                {/* right side */}
                <div className="col-span-4 lg:col-span-1 space-y-2 bg-secondary-gray p-3 rounded-md">
                  <div className="mb-2">
                    <label className="font-semibold text-font-200">
                      Featured Image
                    </label>
                    <SingleImageUploader setFileName={setFileName}/>
                  </div>

                  <div className="mb-2">
                    <label className="font-semibold text-font-200">
                      Category
                    </label>
                    <Field
                      as="select"
                      name="category"
                      className="border border-border-gray p-2 rounded w-full text-gray-500"
                    >
                      <option value="" className="capitalize text-black">
                        Select Category
                      </option>
                      {categories.map((cat) => (
                        <option
                          key={cat.category}
                          value={cat.category}
                          className="capitalize"
                        >
                          {cat.category
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </option>
                      ))}
                    </Field>

                    <Field
                      as="select"
                      name="subCategory"
                      className="border border-border-gray p-2 rounded w-full mt-2 text-gray-500"
                      disabled={!selectedCategory}
                    >
                      <option value="" className="capitalize text-black">
                        Select Subcategory
                      </option>
                      {selectedCategory?.subCategories.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <div className="mb-2">
                    <label className="font-semibold text-font-200">Tags</label>
                    <Field
                      name="keywords"
                      placeholder="Enter keywords (comma separated)"
                      className="w-full border border-border-gray p-2 rounded"
                    />
                  </div>
                  {/* Slug */}
                  <div>
                    <Field
                      name="slug"
                      placeholder="Slug (URL-friendly)"
                      className="w-full border p-2 rounded border-border-gray"
                    />
                    <ErrorMessage
                      name="slug"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  {/* Sheets */}
                  <div>
                    <label className="font-semibold text-font-200">
                      Sheets
                    </label>
                    <Field
                      name="datasheetUrl"
                      placeholder="Datasheet Url"
                      className="w-full border p-2 rounded border-border-gray mb-2"
                    />
                    <Field
                      name="diagramUrl"
                      placeholder="Diagram Slug"
                      className="w-full border p-2 rounded border-border-gray mb-2"
                    />
                    <Field
                      name="userManualUrl"
                      placeholder="User Manual Url"
                      className="w-full border p-2 rounded border-border-gray mb-2"
                    />
                  </div>
                  {/* Best Seller */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center gap-x-2">
                      <Field
                        type="checkbox"
                        name="isFeaturedProduct"
                        className="h-4 w-4 border border-border-gray rounded"
                      />
                      <label className="text-sm">Featured</label>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Field
                        type="checkbox"
                        name="isBestSeller"
                        className="h-4 w-4 border border-border-gray rounded"
                      />
                      <label className="text-sm">Best Seller</label>
                    </div>
                  </div>

                  {/* Product Status */}
                  <div>
                    <Field
                      as="select"
                      name="status"
                      className="w-full border p-2 rounded border-border-gray"
                    >
                      <option value="">Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="pending">Pending</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-secondary-gray rounded mt-2 cursor-pointer"
              >
                Create
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default CreateProduct;
