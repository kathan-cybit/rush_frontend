import React, { useEffect, useMemo, useState } from "react";
import { CreateUserComponent } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createTenantUser,
  fetchUsers,
  getAllRoleUsers,
  getRoles,
  updateTenantUser,
} from "../../../store/reducers/tenantSlice";
import {
  getAllLicenses,
  getLicenseApps,
  getLicensesCount,
} from "../../../store/reducers/licenseSlice";
import { Loader } from "../../ui";

interface UserFormValues {
  name: string;
  email: string;
  password?: string;
  phonenumber: string;
  status: string;
  assigned_apps: string[];
  role_ids: string[] | number[];
}

interface FormStatus {
  mode: "view" | "edit" | null;
  userId: any;
}

export default function CreateUserContainer({
  // CurrData = {},
  // FormStatus = { mode: null, userId: null },
  // setFormStatus,
  setdisplayAlert,
  allUsersRoles,
}: any) {
  const location = useLocation();

  const safeState = useMemo(() => {
    return location.state && typeof location.state === "object"
      ? location.state
      : {};
  }, [location.state]);

  const CurrData = safeState.CurrData ?? {};
  const FormStatus = safeState.FormStatus ?? {
    mode: null,
    tenant: null,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    tenantType,
    allDetails,
    loading: loading2,
  } = useSelector((state: RootState) => state.auth);
  const [assignedApps, setAssignedApps] = useState<string[]>([]);
  const allRoles = useSelector((state: any) => state.tenant.allRoles) || [];
  const loading = useSelector((state: any) => state.tenant.isLoading);
  // const allUsersRoles =
  //   useSelector((state: any) => state.tenant.allUsersRoles) || [];
  const [defaultUserRoleOptions, setDefaultUserRoleOptions] = useState([]);

  const { allApps, allLicenseWithCounts, allLicenses } = useSelector(
    (state: RootState) => state.license
  );

  useEffect(() => {
    const host = new URL(window.location.href).hostname.split(".")[0];
    dispatch(
      getLicenseApps({
        role: tenantType,
        headers: { "x-tenant-id": host },
      })
    );
    if (host != "public") {
      dispatch(
        getAllLicenses({
          headers: { "x-tenant-id": host },
        })
      );

      dispatch(
        getLicensesCount({
          headers: { "x-tenant-id": host },
        })
      );
    }
  }, []);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      first_name: CurrData?.first_name || "",
      last_name: CurrData?.last_name || "",
      email: CurrData?.email || "",
      password: "",
      phonenumber: CurrData?.phonenumber || "",
      address_one: CurrData?.address_one || "",
      address_two: CurrData?.address_two || "",
      pincode: CurrData?.pincode || "",
      city: CurrData?.city || "",
      country: CurrData?.country || "",
      status: CurrData?.status || "active",
      assigned_apps: CurrData?.assigned_apps || [],
      role_ids: CurrData?.role_ids || [],
    },
  });

  useEffect(() => {
    if (FormStatus?.mode && CurrData) {
      setValue("first_name", CurrData.first_name);
      setValue("last_name", CurrData.last_name);
      setValue("email", CurrData.email);
      setValue("phonenumber", CurrData.phonenumber);
      setValue("status", CurrData.status);
      setValue("address_one", CurrData.address_one);
      setValue("address_two", CurrData.address_two);
      setValue("pincode", CurrData.pincode);
      setValue("city", CurrData.city);
      setValue("country", CurrData.country);
      if (CurrData?.assigned_apps && CurrData?.assigned_apps?.length > 0) {
        setAssignedApps(CurrData.assigned_apps.map((id: any) => id));
      } else {
        setAssignedApps([]);
      }
    }
  }, [CurrData, FormStatus?.mode]);
  const onDiscard = () => {
    reset();

    navigate("/usermanagement", { replace: true });
  };

  const onSubmit = async (data: UserFormValues) => {
    data.assigned_apps = assignedApps;
    const host = new URL(window.location.href).hostname.split(".")[0];
    // debugger;
    // return;
    if (!FormStatus?.mode) {
      await dispatch(createTenantUser({ payload: data, currentTenant: host }))
        .unwrap()
        .then((res) => {
          setAssignedApps([]);

          onDiscard();
        })
        .catch((res) => {});
    } else {
      await dispatch(
        updateTenantUser({
          id: CurrData.id,
          payload: data,
          currentTenant: host,
        })
      )
        .then(() => {
          setAssignedApps([]);

          dispatch(
            fetchUsers({
              url: `/users?tenant=${host}`,
            })
          );
          onDiscard();
        })
        .catch((err) => {});
    }
  };

  const handleReset = (mode: any, id: any) => {
    navigate("/usermanagement");
  };

  const BreadCrumbItems = [
    {
      title: "User Management",
      onClick: () => {
        navigate("/usermanagement");
      },
    },
    {
      title:
        FormStatus?.mode === "edit"
          ? "Edit User"
          : FormStatus?.mode === "view"
          ? "View User"
          : "New User",
    },
  ];

  useEffect(() => {
    const host = new URL(window.location.href).hostname.split(".")[0];
    if ((FormStatus?.mode && FormStatus?.mode == "edit") || !FormStatus?.mode) {
      dispatch(
        getRoles({
          role: tenantType,
          headers: {
            "x-tenant-id": host,
          },
        })
      );
    }
  }, []);

  useEffect(() => {
    if (
      (FormStatus?.mode == "edit" || FormStatus?.mode == "view") &&
      CurrData?.id &&
      allUsersRoles?.length > 0
    ) {
      const found = allUsersRoles.find((u) => u.user_id === CurrData.id);

      if (found) {
        const formatted = found.roles.map((r) => ({
          value: r.id,
          label: r.name,
        }));

        setDefaultUserRoleOptions(formatted);
        setValue(
          "role_ids",
          formatted.map((x) => x.value)
        );
      }
    }
  }, [FormStatus?.mode, CurrData, allUsersRoles]);

  useEffect(() => {
    if (allDetails?.is_single_org && allRoles?.length > 0) {
      const allRoleIds = allRoles.map((r: any) => r.id);

      setValue("role_ids", allRoleIds);

      const formatted = allRoles.map((r: any) => ({
        value: r.id,
        label: r.name,
      }));

      setDefaultUserRoleOptions(formatted);
    }
  }, [allDetails?.is_single_org, allRoles]);

  const roleOptions = allRoles.map((r) => ({
    value: r.id,
    label: r.name,
  }));

  return (
    <div>
      {(loading || loading2) && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <CreateUserComponent
        roleOptions={roleOptions}
        defaultUserRoleOptions={defaultUserRoleOptions}
        register={register}
        errors={errors}
        navigate={navigate}
        handleSubmit={handleSubmit(onSubmit)}
        CurrData={CurrData}
        FormStatus={FormStatus}
        onDiscard={onDiscard}
        handleReset={handleReset}
        BreadCrumbItems={BreadCrumbItems}
        assignedApps={assignedApps}
        setAssignedApps={setAssignedApps}
        control={control}
        allRoles={allRoles}
        allApps={allApps}
        allLicenseWithCounts={allLicenseWithCounts}
        allLicenses={allLicenses}
        allDetails={allDetails}
      />
    </div>
  );
}
