import React from "react";
import Loader from "../../../components/loader/Loader";
// import CustomTable2 from "../../../components/customTable/CustomTable";

interface userProps {
  loading: boolean;
  paginatedData: Array<any>;
  userColumns: any;
  pagination: any;
  userData: any;
  setPagination: any;
}

export default function UserComponent({
  loading,
  paginatedData,
  userColumns,
  pagination,
  userData,
  setPagination,
}: userProps) {
  return (
    <div>
      {loading && <Loader />}
      {paginatedData?.length > 0 && (
        <></>
        // <CustomTable2
        //   data={paginatedData}
        //   columns={userColumns}
        //   staticTable={true}
        //   isPagination={true}
        //   paginationObj={pagination}
        //   totalCount={userData.length}
        //   onPageChange={(page, size) => {
        //     setPagination({ pageIndex: page, pageSize: size });
        //   }}
        //   // onRowClick={(row) => console.log("Row clicked:", row.original)}
        // />
      )}
    </div>
  );
}
