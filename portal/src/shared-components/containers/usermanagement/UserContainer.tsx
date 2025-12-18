import React, { useEffect, useMemo, useState } from "react";
import { EditIcon, EyeIcon } from "../../../assets/svgs";
import {
  fetchUsers,
  getAllRoleUsers,
} from "../../../store/reducers/tenantSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { UserComponent } from "../../components";

export default function UserContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { users: userData, isLoading: loading } = useSelector(
    (state: RootState) => state.tenant
  );

  const [FormStatus, setFormStatus] = useState({
    mode: null,
    userId: null,
  });

  const [CurrData, setCurrData] = useState<any>(null);
  const host = new URL(window.location.href).hostname.split(".")[0];
  const { currentTenantName } = useSelector((state: RootState) => state.auth);
  const { tenantType } = useSelector((state: RootState) => state.auth);
  const allUsersRoles =
    useSelector((state: any) => state.tenant.allUsersRoles) || [];

  const menuItems = [
    {
      label: "View",
      icon: <EditIcon className="" color="#000" />,
      onClick: (row: any) => {
        handleViewUser(row);
      },
    },
    {
      label: "Edit",
      color: "blue",
      icon: <EyeIcon color="#228be6" />,
      onClick: (row: any) => {
        handleEditUser(row);
      },
    },
  ];

  const statusColorMap = {
    active: "green",
    inactive: "red",
  };

  useEffect(() => {
    if (
      FormStatus.userId &&
      (FormStatus.mode == "view" || FormStatus.mode == "edit")
    ) {
      const data = userData.find((e: any) => e.id === FormStatus.userId);
      setCurrData(data);
    }
  }, [FormStatus, userData]);

  const handleViewUser = (row: any) => {
    setFormStatus({ mode: "view", userId: row.id });
  };

  const handleEditUser = (row: any) => {
    setFormStatus({ mode: "edit", userId: row.id });
  };

  useEffect(() => {
    if (currentTenantName) {
      dispatch(
        fetchUsers({
          url: `/users?tenant=${currentTenantName}`,
        })
      );
    }
  }, [currentTenantName]);

  useEffect(() => {
    dispatch(
      getAllRoleUsers({
        role: tenantType,
        headers: {
          "x-tenant-id": host,
        },
      })
    );
  }, [FormStatus.mode, userData]);

  const formattedTenants = userData?.map((e: any) => ({
    id: e?.id,
    username: e.first_name + " " + e?.last_name,
    status: e.status,
    email: e.email,
    "phone number": e.phonenumber,
    roles: allUsersRoles
      .find((u) => u.user_id == e?.id)
      ?.roles.map((role) => role.name)
      .sort()
      .join(", "),
  }));

  const roleProps = {
    loading,
    userData,
    FormStatus,
    CurrData,
    handleViewUser,
    handleEditUser,
    setFormStatus,
    formattedTenants,
    statusColorMap,
    menuItems,
    allUsersRoles,
  };
  return (
    <div>
      <div className="mx-auto">
        <div className="p-4">
          <UserComponent {...roleProps} />
        </div>
      </div>
    </div>
  );
}
