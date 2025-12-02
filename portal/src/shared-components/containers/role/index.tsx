import React, { useEffect, useState } from "react";
import { EditIcon } from "../../../assets/svgs";
import { RoleComponent } from "../../components";

export default function RoleContainer() {
  const roleData = [
    {
      id: 1,
      roleName: "Software Developer 1",
      description: "All the devs are to be assigned this role",
      permissions: "can_edit_project, can_add_project, can_view_project",
    },
    {
      id: 2,
      roleName: "HR",
      description: "All the HRs are to be assigned this role",
      permissions: "can_view_project",
    },
    {
      id: 3,
      roleName: "Dev-Ops",
      description: "NA",
      permissions: "can_view_project",
    },
    {
      id: 4,
      roleName: "Project Managers",
      description: "NA",
      permissions:
        "can_view_project, can_edit_project, can_add_project, can_delete_project",
    },
  ];

  const roleColumns = [
    {
      accessorKey: "roleName",
      header: "NAME",
      cell: ({ getValue }) => <strong>{getValue()}</strong>,
    },
    {
      accessorKey: "description",
      header: "DESCRIPTION",
    },
    {
      accessorKey: "permissions",
      header: "PERMISSIONS",
    },
    {
      id: "actions",
      header: "ACTION",
      cell: () => (
        <div className="action-buttons">
          <button className="action-btn edit">
            <EditIcon />
          </button>
        </div>
      ),
    },
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    console.log(roleData.slice(start, end));
    setPaginatedData(roleData.slice(start, end));
  }, [pagination?.pageIndex, pagination?.pageSize]);

  const sharedProps = {
    paginatedData,
    roleColumns,
    pagination,
    roleData,
    setPagination,
  };
  return (
    <>
      <RoleComponent {...sharedProps} />
    </>
  );
}
