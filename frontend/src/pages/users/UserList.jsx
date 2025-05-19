import React from "react";
import { GlobalTable } from "../../components";
import { useState } from "react";
import { useGetAllUsersQuery } from "../../features/user/UserApi";
import { Pen, PenIcon, Trash2 } from "lucide-react";

const UserList = () => {
  const { data, isLoading, isError } = useGetAllUsersQuery();

  const rowData = (data?.users || []).map((user, index) => ({
    id: index + 1,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin ? "Yes" : "No",
  }));

  console.log("data", data);

  //  const [rowData] = useState([
  //   {
  //     _id: 1,
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     isAdmin: "TechCorp",

  //   }]);

  const [columnDefs] = useState([
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      filter: true,
    },

    { field: "email", headerName: "Email" },
    { field: "isAdmin", headerName: "Is Admin" },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: (params) => (
        <div className="space-x-2">
          <button
            className=""
            // onClick={() => handleEdit(params.data)}
          >
            <PenIcon className="w-4 h-4" />
          </button>
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
        classname={"w-[60%] h-[80vh]"}
        search={false}
      />
    </div>
  );
};

export default UserList;
