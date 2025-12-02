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

  const [FormStatus, setFormStatus] = useState({
    mode: null,
    userId: null,
  });

  const [CurrData, setCurrData] = useState<any>(null);

  const { currentTenantName } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    debugger;
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
          url: `http://localhost:8080/api/users?tenant=${currentTenantName}`,
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
  };
  return (
    <div>
      <UserComponent {...roleProps} />
    </div>
  );
}
