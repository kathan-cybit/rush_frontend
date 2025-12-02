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

  const roleProps = {
    loading,
    userData,
  };
  return (
    <div>
      <UserComponent {...roleProps} />
    </div>
  );
}
