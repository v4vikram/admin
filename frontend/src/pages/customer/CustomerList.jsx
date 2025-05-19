import React, { useState } from "react";
import {
  GlobalTable,
  Breadcrumb,
  GlobalSearch,
  LinkButton,
} from "../../components";
import { PenIcon, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useGetCustomerQuery } from "../../features/customer/customerApi";


const CustomerList = () => {
  const gridRef = useRef(null);
  const { data } = useGetCustomerQuery();

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
    { field: "_id", headerName: "ID" },
    {
      field: "visitDate",
      headerName: "Visit Date",
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    {
      field: "created",
      headerName: "Enter Date",
    },
    { field: "inTime", headerName: "In Time" },
    { field: "outTime", headerName: "Out Time" },
    { field: "companyName", headerName: "Company" },
    { field: "contactPerson", headerName: "Contact Person" },
    { field: "phone", headerName: "Phone" },
    { field: "email", headerName: "Email" },
    { field: "city", headerName: "City" },
    { field: "state", headerName: "State" },
    { field: "salesPerson", headerName: "Sales Person" },
    {
      field: "status",
      headerName: "Status",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["new", "contacted", "in-progress", "converted", "lost"],
      },
      cellRenderer: (params) => {
        const status = params.value;
        return (
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold
          ${
            status === "new"
              ? "bg-green-100 text-green-700"
              : status === "contacted"
              ? "bg-blue-100 text-blue-700"
              : status === "in-progress"
              ? "bg-yellow-100 text-yellow-700"
              : status === "converted"
              ? "bg-purple-100 text-purple-700"
              : status === "lost"
              ? "bg-red-100 text-red-700"
              : "bg-gray-200 text-gray-700"
          }`}
          >
            {status}
          </span>
        );
      },
    },
    { field: "remarks", headerName: "Remarks" },
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

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb paths={["dashboard", "Customer Management", "Customer List"]} />
        <div className="flex items-center mb-2 gap-x-2">
          <LinkButton url={`/dashboard/customer-management/customer/visit`}>
            Add Customer
          </LinkButton>
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

export default CustomerList;
