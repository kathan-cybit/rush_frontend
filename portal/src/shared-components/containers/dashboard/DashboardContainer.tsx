import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  deleteTenant,
  fetchTenants,
  getAllUsersRolesPermissions,
} from "../../../store/reducers/tenantSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { DashboardComponent } from "../../components";
import { DeleteIcon, EditIcon, EyeIcon } from "../../../assets/svgs";
import {
  getAllLicenses,
  getAllTenantsWithLicenses,
  getLicenseApps,
} from "../../../store/reducers/licenseSlice";
import { formatUtcToIST } from "../../../utils/commonFunctions";

export default function DashboardContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const host = new URL(window.location.href).hostname.split(".")[0];
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

  const [ConfirmDelete, setConfirmDelete] = useState<any>({
    mode: false,
    row: null,
  });
  const [FormStatus, setFormStatus] = useState({
    mode: null as "view" | "edit" | null,
    tenant: null as string | null,
  });

  // const [CurrData, setCurrData] = useState<any>(null);

  const { allApps, allLicenses, allTenantWithLicenses } = useSelector(
    (state: RootState) => state.license
  );

  const hasManageOrgSettings = allUsersRolesPermissions?.roles?.some((role) =>
    role.permissions?.some(
      (perm) => perm.name === "Manage Organization Settings"
    )
  );

  useEffect(() => {
    if (!ConfirmDelete?.mode) {
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
    }
  }, [ConfirmDelete]);

  useEffect(() => {
    if (!ConfirmDelete?.mode) {
      if (host == "public") {
        dispatch(fetchTenants(host));
      }
    }
  }, [ConfirmDelete]);

  useEffect(() => {
    if (
      FormStatus.tenant &&
      (FormStatus.mode == "view" || FormStatus.mode == "edit")
    ) {
      const data = tenants.find((e: any) => e.id == FormStatus.tenant);
      // setCurrData(data);
      if (FormStatus.mode == "view") {
        navigate("/viewtenant", {
          state: {
            CurrData: data,
            FormStatus: FormStatus,
          },
        });
      } else {
        navigate("/edittenant", {
          state: {
            CurrData: data,
            FormStatus: FormStatus,
          },
        });
      }
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

  const modalClose = () => {
    setConfirmDelete({ mode: false, row: null });
  };
  const deleteEntry = async (row: any, host: any, tenantType: any) => {
    dispatch(
      deleteTenant({
        payload: { domain: row.domain },
        headers: { "x-tenant-id": host },
      })
    )
      .unwrap()
      .then(() => {
        modalClose();
      })
      .catch(() => {});
  };
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
    {
      label: "Delete",
      color: "#ef4444",
      icon: <DeleteIcon color="#ef4444" />,
      onClick: (row: any) => {
        setConfirmDelete({ mode: true, row: row });
      },
    },
  ];

  let formattedTenants: any[] = [];

  if (tenants && allApps) {
    formattedTenants = tenants
      ?.map((tenant: any) => {
        const row: any = {
          id: tenant.id,
          company: tenant.company_name,
          domain: tenant.domain,
          status: tenant.status,

          _updatedAtRaw: tenant?.updated_at,
        };

        if (Array.isArray(tenant?.licenses) && tenant.licenses.length > 0) {
          const licenseMap = new Map(
            tenant.licenses.map((l: any) => [l.application_id, Number(l.count)])
          );

          allApps.forEach((app: any) => {
            const totalLicenses =
              allTenantWithLicenses
                ?.find((t: any) => t?.tenant_id == tenant?.id)
                ?.licenses?.filter((e: any) => e?.application_id == app.id)
                ?.length || 0;

            const freeCount = licenseMap.get(app.id) ?? 0;
            row[
              `${app.name}` + " " + "LICENSES"
            ] = `${freeCount}/${totalLicenses}`;
          });
        }

        row["Created At"] = formatUtcToIST(tenant?.created_at);
        row["Last Updated"] = formatUtcToIST(tenant?.updated_at);

        return row;
      })
      .sort(
        (a: any, b: any) =>
          new Date(b._updatedAtRaw).getTime() -
          new Date(a._updatedAtRaw).getTime()
      )

      .map(({ _updatedAtRaw, ...rest }: any) => rest);
  }

  const ignoreArray = [
    "id",
    "company",
    "domain",
    "status",
    "Created At",
    "Last Updated",
  ];

  const tooltipObj = formattedTenants.map((row) => {
    const obj = {};

    for (const [key, value] of Object.entries(row)) {
      if (ignoreArray.includes(key)) {
        obj[key] = null;
      } else if (typeof value === "string" && value.includes("/")) {
        const [a, b] = value.split("/").map(Number);
        obj[key] = ` ${a} licenses remaining out of ${b}`;
      } else {
        obj[key] = null;
      }
    }

    return obj;
  });

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
    // CurrData,
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
    tooltipObj,
    ConfirmDelete,
    setConfirmDelete,
    deleteEntry,
    modalClose,
    tenantType,
  };

  return (
    <>
      <div className="p-4">
        <DashboardComponent {...componentProps} />
      </div>
    </>
  );
}
