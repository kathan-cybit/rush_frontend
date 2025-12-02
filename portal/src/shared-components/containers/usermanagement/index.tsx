import React, { useEffect, useState } from "react";
import { EditIcon, EyeIcon } from "../../../assets/svgs";
import { fetchUsers } from "../../../store/reducers/tenantSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { UserComponent } from "../../components";

export default function UserContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { users: userData, isLoading: loading } = useSelector(
    (state: RootState) => state.tenant
  );
  const { currentTenantName } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (currentTenantName) {
      dispatch(
        fetchUsers({
          url: `http://localhost:8080/api/users?tenant=${currentTenantName}`,
        })
      );
    }
  }, [currentTenantName]);

  const userColumns = [
    {
      accessorKey: "name",
      accessorFn: (row) => row.name ?? "-",
      header: "NAME",
      cell: ({ getValue }) => <strong>{getValue()}</strong>,
    },
    {
      accessorKey: "status",
      accessorFn: (row) => row.status ?? "-",
      header: "STATUS",
      cell: ({ getValue }) => {
        const status = getValue();
        return (
          <span className={`badge-parent ${status.toLowerCase()}`}>
            <span className={`status-badge ${status.toLowerCase()}`}>
              <span className="status-dot"></span>
              {status}
            </span>
          </span>
        );
      },
    },
    {
      accessorKey: "mfaMode",
      accessorFn: (row) => row.mfaMode ?? "-",
      header: "MFA MODE",
    },
    {
      accessorKey: "bypassVerification",
      accessorFn: (row) => row.bypassVerification ?? "-",
      header: "BYPASS VERIFICATION",
    },
    {
      accessorKey: "assigned_apps",
      accessorFn: (row) => {
        if (row.assigned_apps?.length == 0) {
          return "-";
        } else {
          return row.assigned_apps.join();
        }
      },
      header: "ASSIGNED APPS",
    },
    {
      accessorKey: "email",
      accessorFn: (row) => row.email ?? "-",
      header: "EMAIL",
    },
    {
      accessorKey: "phonenumber",
      accessorFn: (row) => row.phonenumber ?? "-",
      header: "PHONE NUMBER",
    },
    {
      id: "actions",
      header: "ACTION",
      cell: () => (
        <div className="action-buttons">
          <button className="action-btn mail">
            <EyeIcon />
          </button>
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
    if (pagination.pageSize < userData?.length) {
      setPaginatedData(userData.slice(start, end));
    } else {
      setPaginatedData(userData);
    }
  }, [pagination?.pageIndex, pagination?.pageSize, userData]);

  const roleProps = {
    loading,
    paginatedData,
    userColumns,
    pagination,
    userData,
    setPagination,
  };
  return (
    <div>
      <UserComponent {...roleProps} />
    </div>
  );
}
