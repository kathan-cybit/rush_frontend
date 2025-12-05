import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchTenants } from "../../../store/reducers/tenantSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { DashboardComponent } from "../../components";
import { EditIcon, EyeIcon } from "../../../assets/svgs";

export default function DashboardContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "View",
      icon: <EyeIcon className="" color="#000" />,
      onClick: (row: any) => {
        handleViewTenant(row);
      },
    },
    {
      label: "Edit",
      color: "blue",
      icon: <EditIcon color="#228be6" />,
      onClick: (row: any) => {
        handleEditTenant(row);
      },
    },
  ];
  const statusColorMap = {
    active: "green",
    inactive: "red",
  };

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

  const formattedTenants = useMemo(() => {
    return tenants?.map((tenant: any) => ({
      id: tenant.id,
      company: tenant.company_name,
      domain: tenant.domain,
      status: tenant.status,
      excel: tenant.licenses.excel,
      outlook: tenant.licenses.outlook,
      powerPoint: tenant.licenses.powerPoint,
      microsoftTeam: tenant.licenses.microsoftTeam,
    }));
  }, [tenants]);

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
    statusColorMap,
    menuItems,
    formattedTenants,
  };

  return <DashboardComponent {...componentProps} />;
}
