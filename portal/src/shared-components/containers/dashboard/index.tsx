import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Badge } from "@mantine/core";
import { fetchTenants } from "../../../store/reducers/tenantSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { DashboardComponent } from "../../components";

export default function DashboardContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { tenants, isLoading } = useSelector(
    (state: RootState) => state.tenant
  );

  const [host, setHost] = useState<string | null>(null);

  const [FormStatus, setFormStatus] = useState({
    mode: null as "view" | "edit" | null,
    tenant: null as string | null,
  });

  const [CurrData, setCurrData] = useState<any>(null);

  // ── Effects ------------------------------------------------------------
  useEffect(() => {
    const subDomain = new URL(window.location.href).hostname.split(".")[0];
    setHost(subDomain);
    if (subDomain === "public") {
      dispatch(fetchTenants(subDomain));
    }
  }, []);

  useEffect(() => {
    if (
      FormStatus.tenant &&
      (FormStatus.mode == "view" || FormStatus.mode == "edit")
    ) {
      const data = tenants.find((e: any) => e.id === FormStatus.tenant);
      setCurrData(data);
    }
  }, [FormStatus, tenants]);

  const handleCreateTenant = () => {
    navigate(host !== "public" ? "/usermanagement" : "/createtenant");
  };

  const handleViewTenant = (row: any) => {
    setFormStatus({ mode: "view", tenant: row.id });
  };

  const handleEditTenant = (row: any) => {
    setFormStatus({ mode: "edit", tenant: row.id });
  };

  const componentProps = {
    host,
    isLoading,
    tenants,
    FormStatus,
    CurrData,
    handleCreateTenant,
    handleViewTenant,
    handleEditTenant,
    setFormStatus,
  };

  return <DashboardComponent {...componentProps} />;
}
