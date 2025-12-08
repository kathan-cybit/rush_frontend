import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchUsers } from "../../../store/reducers/tenantSlice";

import { LicenseComponent } from "../../components";
import { Loader } from "../../ui";

export default function LicenseContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading: loading } = useSelector(
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

  return (
    <div>
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <LicenseComponent users={users} />
    </div>
  );
}
