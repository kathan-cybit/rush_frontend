import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchTenants,
  getAllUsersRolesPermissions,
} from "../../../store/reducers/tenantSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { DashboardComponent } from "../../components";
import { EditIcon, EyeIcon } from "../../../assets/svgs";
import {
  getAllLicenses,
  getAllTenantsWithLicenses,
  getLicenseApps,
} from "../../../store/reducers/licenseSlice";

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

  const { tenants, isLoading, allUsersRolesPermissions } = useSelector(
    (state: RootState) => state.tenant
  );
  const { user, loading, tenantType, token } = useSelector(
    (state: RootState) => state.auth
  );
  const [host, setHost] = useState<string | null>(null);

  const [FormStatus, setFormStatus] = useState({
    mode: null as "view" | "edit" | null,
    tenant: null as string | null,
  });

  const [CurrData, setCurrData] = useState<any>(null);

  const { allApps, allLicenses, allTenantWithLicenses } = useSelector(
    (state: RootState) => state.license
  );

  const hasManageOrgSettings = allUsersRolesPermissions?.roles?.some((role) =>
    role.permissions?.some(
      (perm) => perm.name === "Manage Organization Settings"
    )
  );

  useEffect(() => {
    const host = new URL(window.location.href).hostname.split(".")[0];
    dispatch(
      getLicenseApps({
        role: tenantType,
        headers: { "x-tenant-id": host },
      })
    );
    if (host != "public" && host != "admin") {
      dispatch(
        getAllLicenses({
          headers: { "x-tenant-id": host },
        })
      );
      dispatch(
        getAllUsersRolesPermissions({
          params: user?.id,
          headers: { "x-tenant-id": host },
        })
      );
    } else {
      dispatch(
        getAllTenantsWithLicenses({
          headers: { "x-tenant-id": "public" },
        })
      );
    }
  }, [FormStatus]);

  // ── Effects ------------------------------------------------------------
  useEffect(() => {
    const host = new URL(window.location.href).hostname.split(".")[0];
    setHost(host);
    if (host == "public") {
      dispatch(fetchTenants(host));
    }
  }, [FormStatus]);

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
    navigate(host != "public" ? "/usermanagement" : "/createtenant");
  };

  const handleViewTenant = (row: any) => {
    setFormStatus({ mode: "view", tenant: row.id });
  };

  const handleEditTenant = (row: any) => {
    setFormStatus({ mode: "edit", tenant: row.id });
  };

  const allLicenseKeys = Array.from(
    new Set(
      tenants?.flatMap((tenant: any) =>
        tenant?.licenses ? Object.keys(tenant.licenses) : []
      )
    )
  );

  // const formattedTenants = useMemo(() => {
  //   if (!tenants || !allApps) return [];

  //   return tenants.map((tenant: any) => {
  //     const row: any = {
  //       id: tenant.id,
  //       company: tenant.company_name,
  //       domain: tenant.domain,
  //       status: tenant.status,
  //     };

  //     if (Object.values(tenant?.licenses)?.length > 0) {
  //       // Normalize licenses array for quick lookup
  //       const licenseMap = new Map(
  //         (tenant.licenses || []).map((l: any) => [
  //           Number(l.application_id),
  //           Number(l.count),
  //         ])
  //       );

  //       allApps.forEach((app: any) => {
  //         row[`${app.name}`] = `${licenseMap.get(app.id) ?? 0}/${
  //           allTenantWithLicenses[0]?.licenses?.filter((e: any) => {
  //             return e?.application_id == app.id;
  //           })?.length
  //         }`;
  //       });
  //       // allApps.forEach((app: any) => {
  //       //   if (!licenseMap.has(app.id)) {
  //       //     row[`${app.name}`] = "N/A";
  //       //   } else {
  //       //     row[`${app.name}`] = licenseMap.get(app.id) ?? 0;
  //       //   }
  //       // });
  //     }

  //     return row;
  //   });
  // }, [tenants, allApps]);

  let formattedTenants: any[] = [];

  if (tenants && allApps) {
    formattedTenants = tenants.map((tenant: any) => {
      const row: any = {
        id: tenant.id,
        company: tenant.company_name,
        domain: tenant.domain,
        status: tenant.status,
      };

      if (Array.isArray(tenant?.licenses) && tenant.licenses.length > 0) {
        const licenseMap = new Map(
          tenant.licenses.map((l: any) => [l.application_id, Number(l.count)])
        );

        allApps.forEach((app: any) => {
          const totalLicenses =
            allTenantWithLicenses?.[0]?.licenses?.filter(
              (e: any) => e?.application_id === app.id
            )?.length || 0;

          const freeCount = licenseMap.get(app.id) ?? 0;

          row[app.name] = `${freeCount}/${totalLicenses}`;
        });
      }

      return row;
    });
  }

  const licensedAppIds = new Set(
    allLicenses?.map((l: any) => l?.application_id)
  );

  const filteredApps = allApps?.filter((app: any) =>
    licensedAppIds?.has(app.id)
  );

  const componentProps = {
    allApps,
    allLicenses,
    user,
    host,
    isLoading,
    loading,
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
    token,
    filteredApps,
    allTenantWithLicenses,
    hasManageOrgSettings,
  };

  return (
    <>
      <div className="p-4">
        <DashboardComponent {...componentProps} />
      </div>
    </>
  );
}
