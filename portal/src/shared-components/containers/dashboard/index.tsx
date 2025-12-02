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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

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
      (FormStatus.mode === "view" || FormStatus.mode === "edit")
    ) {
      const data = tenants.find((e: any) => e.id === FormStatus.tenant);
      setCurrData(data);
    }
  }, [FormStatus, tenants]);

  // ── Handlers -----------------------------------------------------------
  const handleCreateTenant = () => {
    navigate(host !== "public" ? "/usermanagement" : "/createtenant");
  };

  const handleViewTenant = (row: any) => {
    setFormStatus({ mode: "view", tenant: row.id });
  };

  const handleEditTenant = (row: any) => {
    setFormStatus({ mode: "edit", tenant: row.id });
  };

  // ── Props for the presentational component ----------------------------
  const componentProps = {
    host,
    isLoading,
    tenants,
    pagination,
    FormStatus,
    CurrData,
    customColumns: [
      {
        key: "company_name",
        label: "Company",
        width: 200,
        render: (value: any) => (
          <span className="font-fsecondary text-[16px] text-[700] text-textPrimary align-middle leading-[140%]">
            {value}
          </span>
        ),
      },
      {
        key: "domain",
        label: "Domain",
        width: 200,
        render: (value: any, row: any) => {
          return row.domain.endsWith(".com") ? row.domain : `${row.domain}.com`;
        },
      },
      {
        key: "status",
        label: "STATUS",
        render: (value: any) => (
          <span className={`badge-parent ${value.toLowerCase()}`}>
            <span className={`status-badge ${value.toLowerCase()}`}>
              <span className="status-dot"></span>
              {value}
            </span>
          </span>
        ),
      },
      {
        key: "contactperson",
        label: "CONTACT PERSON",
        width: 200,
        render: (value: any) => <span>{value}</span>,
      },
      {
        key: "licenses.excel",
        label: "Excel Licenses",
        render: (value: any) => <Badge color="blue">{value}</Badge>,
      },
    ],
    handleCreateTenant,
    handleViewTenant,
    handleEditTenant,
    setFormStatus,
  };

  return <DashboardComponent {...componentProps} />;
}
