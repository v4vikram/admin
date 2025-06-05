import React, { useRef, useState } from "react";
import {
  GlobalTable,
  Breadcrumb,
  GlobalSearch,
  LinkButton,
} from "../../components";
import { PenIcon, Trash2, EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useDeleteBlogByIdMutation,
  useGetAllBlogQuery,
} from "../../features/blog/blogApi";
import { toast } from "react-toastify";

const List = () => {
  const gridRef = useRef(null);
  const { data } = useGetAllBlogQuery();

  console.log("data", data)
  
  const [deleteBlogById] = useDeleteBlogByIdMutation();

  const rowData = (data?.blogs || []).map((blog) => ({
    _id: blog._id,
    title: blog.title || "N/A",
    category: blog.mainCategory
      ? `${blog.mainCategory} / ${blog.subCategory || "N/A"}`
      : "N/A",
    keywords: blog.keywords,
    slug: blog.slug,
    featuredImage: blog.featuredImage,
    status: blog.status,
    createdAt: new Date(blog.createdAt).toLocaleDateString(),
  }));

  const [columnDefs] = useState([
    { field: "_id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "slug", headerName: "Slug", flex: 1 },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "keywords",
      headerName: "Tags",
      flex: 1,
    },
    {
      field: "featuredImage",
      headerName: "Image",
      cellRenderer: (params) =>
        params.value ? (
          <div className="flex items-center justify-center w-full h-full overflow-hidden">
            <img
              src={params.value}
              alt="blog-img"
              className="w-12 h-10 object-contain rounded"
            />
          </div>
        ) : (
          "No Image"
        ),
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (params) => (
        <span
          className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
            params.value === "draft"
              ? "bg-yellow-200 text-yellow-800"
              : params.value === "published"
              ? "bg-green-200 text-green-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {params.value}
        </span>
      ),
      width: 120,
    },
    { field: "createdAt", headerName: "Created", width: 120 },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params) => (
        <div className="space-x-2 flex items-center">
          {/* <Link to={`/dashboard/blog/view/${params.data._id}`}>
            <EyeIcon className="w-4 h-4 text-blue-600" />
          </Link> */}
          <Link to={`/dashboard/blog/edit/${params.data._id}`}>
            <PenIcon className="w-4 h-4 text-icon-gray cursor-pointer" />
          </Link>
          <button onClick={() => handleDelete(params.data._id)}>
            <Trash2 className="w-4 h-4 text-icon-gray cursor-pointer" />
          </button>
        </div>
      ),
      width: 120,
    },
  ]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const result = await deleteBlogById(id).unwrap();
       toast.success("Blog Deleted Successfully");
      // Optional: Show toast or refresh the list
    } catch (error) {
      console.error("Delete failed:", error);
      // Optional: Show error toast
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb paths={["dashboard", "Blog", "List"]} />
        <div className="flex items-center mb-2 gap-x-2">
          <LinkButton url={`/dashboard/blog/create`}>Add Blog</LinkButton>
          <GlobalSearch gridRef={gridRef} />
        </div>
      </div>
      <GlobalTable
        rowData={rowData}
        columnDefs={columnDefs}
        classname={"h-[80vh]"}
        gridRef={gridRef}
      />
    </div>
  );
};

export default List;
