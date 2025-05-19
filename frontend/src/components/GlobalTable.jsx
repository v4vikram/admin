import React, { useRef, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const GlobalTable = ({ rowData = [], columnDefs = [], classname, gridRef }) => {
  return (
    <>
      {/* 📊 AG Grid */}
      <div
        className={`ag-theme-quartz !rounded-lg overflow-hidden  ${
          classname ? classname : "w-full h-[500px]"
        }`}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          // paginationPageSize={10}
          pagination={true}
          singleClickEdit={true}
          // domLayout="autoHeight"
          enableCellTextSelection={true}
        />
      </div>
    </>
  );
};

export default GlobalTable;
