import React, { useEffect, useMemo, useState } from "react";
import { EditIcon, EyeIcon } from "../../../assets/svgs";
import {
  fetchUsers,
  getAllRoleUsers,
} from "../../../store/reducers/tenantSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { UserComponent } from "../../components";
import { useNavigate } from "react-router-dom";

export default function UserContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users: userData, isLoading: loading } = useSelector(
    (state: RootState) => state.tenant
  );

  const { tenantType, user } = useSelector((state: RootState) => state.auth);
  const [FormStatus, setFormStatus] = useState({
    mode: null,
    userId: null,
  });

  const [CurrData, setCurrData] = useState<any>(null);
  const [OpenForm, setOpenForm] = useState(false);
  const host = new URL(window.location.href).hostname.split(".")[0];
  const { currentTenantName } = useSelector((state: RootState) => state.auth);
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
    if (currentTenantName && !OpenForm) {
      dispatch(
        fetchUsers({
          url: `/users?tenant=${currentTenantName}`,
        })
      );
    }
  }, [currentTenantName, OpenForm]);

  useEffect(() => {
    if (!OpenForm)
      dispatch(
        getAllRoleUsers({
          role: tenantType,
          headers: {
            "x-tenant-id": host,
          },
        })
      );
  }, [FormStatus.mode, userData, OpenForm]);

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

  const BreadCrumbItems = [
    {
      title: "Home",
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      title: "User Management",
    },
  ];
  const [displayAlert, setdisplayAlert] = useState(false);
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
    user,
    host,
    OpenForm,
    setOpenForm,
    displayAlert,
    setdisplayAlert,
    BreadCrumbItems,
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
