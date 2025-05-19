import React, { useState } from "react";
import { GlobalTable, Breadcrumb } from "../../components";
import { useGetAllSalesPersonsQuery } from "../../features/salespersons/salesPersonsApi";
import { PenIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const SalesPersonList = () => {
  const { data } = useGetAllSalesPersonsQuery();
  const rowData = (data?.salesPersons || []).map((salesPerson, index) => ({
    _id: salesPerson._id,
    name: salesPerson.name,
    email: salesPerson.email,
    created: new Date(salesPerson.createdAt).toLocaleDateString(),
    updated: new Date(salesPerson.updatedAt).toLocaleDateString(),
  }));

  console.log("data", data);

  const [columnDefs] = useState([
    { field: "_id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      filter: true,
    },
    { field: "email", headerName: "Email" },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    {
      field: "updatedAt",
      headerName: "updatedAt",
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    {
      headerName: "Action",
      field: "action",

      cellRenderer: (params) => (
        <div className="space-x-2 flex items-center">
          {console.log("params", params)}
          <Link
            to={`/dashboard/sales-management/sales/edit/${params.data._id}`}
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
      <GlobalTable
        rowData={rowData}
        columnDefs={columnDefs}
        classname={"h-[80vh]"}
      />
    </div>
  );
};

export default SalesPersonList;
