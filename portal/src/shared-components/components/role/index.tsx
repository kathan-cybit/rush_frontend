import React from "react";
// import CustomTable2 from "../../../components/customTable/CustomTable";

interface RolecomponentProps {
  paginatedData: Array<any>;
  roleColumns: Array<unknown>;
  pagination: number | null | string;
  roleData: unknown;
  setPagination: any;
}

export default function RoleComponent({
  paginatedData,
  roleColumns,
  pagination,
  roleData,
  setPagination,
}: any) {
  return (
    <div>
      {/* <CustomTable2
        data={paginatedData}
        columns={roleColumns}
        staticTable={true}
        isPagination={true}
        paginationObj={pagination}
        totalCount={roleData.length}
        onPageChange={(page, size) => {
          setPagination({ pageIndex: page, pageSize: size });
        }}
        // onRowClick={(row) => console.log("Row clicked:", row.original)}
      /> */}
    </div>
  );
}
