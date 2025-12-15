import React, { useEffect, useMemo, useState } from "react";
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

  const [FormStatus, setFormStatus] = useState({
    mode: null,
    userId: null,
  });

  const [CurrData, setCurrData] = useState<any>(null);

  const { currentTenantName } = useSelector((state: RootState) => state.auth);

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

  const formattedTenants = useMemo(() => {
    return userData?.map((e: any) => ({
      id: e?.id,
      username: e.first_name + " " + e?.last_name,
      status: e.status,
      email: e.email,
      phonenumber: e.phonenumber,
    }));
  }, [userData]);

  useEffect(() => {
    if (currentTenantName) {
      dispatch(
        fetchUsers({
          url: `/users?tenant=${currentTenantName}`,
        })
      );
    }
  }, [currentTenantName]);

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
  };
  return (
    <div>
      <UserComponent {...roleProps} />
    </div>
  );
}
