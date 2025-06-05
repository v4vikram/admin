import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Breadcrumb,
  Editor,
  MultiImageUploader,
  SingleImageUploader,
} from "../../components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CirclePlus } from "lucide-react";
import { createBlogValidationSchema, productCreateSchema } from "../../utils/validationSchemas";
import { useCreateBlogMutation } from "../../features/blog/blogApi";
import { toast } from "react-toastify";
import seoFriendlySlug from "../../utils/seoFriendlySlug";

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

const Create = () => {
  const [slugUsingTitle, setSlugUsingTitle] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [createBlog, { isLoading, isSuccess, isError, error }] =
    useCreateBlogMutation();

  console.log("slugUsingTitle", slugUsingTitle);

  const initialValues = {
    title: "",
    content: "",
    description: "",
    mainCategory: "",
    subCategory: "",
    keywords: "",
    slug: "",
    status: "draft",
    featuredImage: null,
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("content", values.content);
    formData.append("featuredImage", fileName);
    formData.append("mainCategory", values.mainCategory);
    formData.append("subCategory", values.subCategory);
    formData.append("keywords", values.keywords);
    formData.append("slug", values.slug);
    formData.append("status", values.status);

    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    try {
      const data = await createBlog(formData).unwrap();

     console.log("data==>", isLoading, isSuccess, isError, error, data);

      if (isSuccess) {
        toast.success("Blog Created Successfully");
      }
      if(error){
        toast.error(`${error?.data?.error}`);
      }
     
    } catch (err) {
       toast.error(`${err?.data?.error}`);
      console.error("Failed to submit blog:", err);
    }
  };

  useEffect(() => {
    const handleDragOver = (e) => e.preventDefault();
    window.addEventListener("dragover", handleDragOver);
    return () => window.removeEventListener("dragover", handleDragOver);
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={createBlogValidationSchema} >
      {({ values, setFieldValue }) => {
        const handleMainCategoryChange = (e) => {
          const selected = e.target.value;
          const found = productCategory.find(
            (cat) => cat.category === selected
          );
          setSubCategories(found?.subCategories || []);
          setFieldValue("mainCategory", selected);
          setFieldValue("subCategory", "");
        };

        return (
          <div>
            <Breadcrumb paths={["dashboard", "Blogs", "Create"]} />
            <Form
              className="mx-auto !text-font-200"
              encType="multipart/form-data"
            >
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-4 lg:col-span-3 space-y-4 bg-secondary-gray p-3 rounded-md">
                  <div className="mb-4">
                    <Field
                      name="title"
                      placeholder="Title"
                      className="w-full border p-2 rounded mb-0 border-border-gray"
                      value={values?.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setFieldValue("title", title);

                        const generatedSlug = seoFriendlySlug(title);
                        setFieldValue("slug", generatedSlug); // <-- set slug in Formik here

                        // setSlugUsingTitle(title); // optional, you can keep this or remove it if not used elsewhere
                      }}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm mb-0"
                    />
                  </div>

                  <div>
                    <Field
                      name="description"
                      as="textarea"
                      placeholder="Description"
                      className="w-full border p-2 rounded border-border-gray"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

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
                </div>

                <div className="col-span-4 lg:col-span-1 space-y-2 bg-secondary-gray p-3 rounded-md">
                  <div className="mb-2">
                    <label className="font-semibold text-font-200">
                      Featured Image
                    </label>
                    <SingleImageUploader
                      setFileName={setFileName}
                      setFilePrview={setFileName}
                    />
                  </div>

                  <label>Main Category</label>
                  <select
                    name="mainCategory"
                    value={values.mainCategory}
                    onChange={handleMainCategoryChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select Main Category</option>
                    {productCategory.map((cat) => (
                      <option key={cat.category} value={cat.category}>
                        {cat.category}
                      </option>
                    ))}
                  </select>

                  <label className="mt-4">Sub Category</label>
                  <select
                    name="subCategory"
                    value={values.subCategory}
                    onChange={(e) =>
                      setFieldValue("subCategory", e.target.value)
                    }
                    className="border p-2 rounded w-full"
                    disabled={!subCategories.length}
                  >
                    <option value="">Select Sub Category</option>
                    {subCategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>

                  <div className="mb-2">
                    <label className="font-semibold text-font-200">Tags</label>
                    <Field
                      name="keywords"
                      placeholder="Enter keywords (comma separated)"
                      className="w-full border border-border-gray p-2 rounded"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-font-200">Slug</label>
                    <Field
                      name="slug"
                      placeholder="Slug (URL-friendly)"
                      value={values.slug}
                      className="w-full border p-2 rounded border-border-gray"
                      disabled
                    />

                    <ErrorMessage
                      name="slug"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-font-200">
                      Status
                    </label>
                    <Field
                      as="select"
                      name="status"
                      className="w-full border p-2 rounded border-border-gray"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-main-gray border border-border-gray rounded mt-2 cursor-pointer"
                  >
                    Create
                  </button>
                </div>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Create;
