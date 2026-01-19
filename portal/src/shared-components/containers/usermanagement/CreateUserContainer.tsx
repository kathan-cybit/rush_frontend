import React, { useEffect, useMemo, useState } from "react";
import { CreateUserComponent } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useLocation, useNavigate } from "react-router-dom";
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
  navigateFunction,
  setdisplayAlert,
}: any) {
  const location = useLocation();
  //since this component/file is common for create/update/view users, this is done to fetch the data for view/update if any
  //otherwise will continue a create user page
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

  const dispatch = useDispatch<AppDispatch>();
  const {
    tenantType,
    allDetails,
    loading: loading2,
  } = useSelector((state: RootState) => state.auth);
  const [assignedApps, setAssignedApps] = useState<string[]>([]);
  const allRoles = useSelector((state: any) => state.tenant.allRoles) || [];
  const loading = useSelector((state: any) => state.tenant.isLoading);
  const allUsersRoles = useSelector((state: any) => state.tenant.allUsersRoles);

  const [defaultUserRoleOptions, setDefaultUserRoleOptions] = useState([]);

  const { allApps, allLicenseWithCounts, allLicenses } = useSelector(
    (state: RootState) => state.license,
  );

  useEffect(() => {
    const host = new URL(globalThis.location.href).hostname.split(".")[0];
    dispatch(
      getLicenseApps({
        role: tenantType,
        headers: { "x-tenant-id": host },
      }),
    );
    if (host != "public") {
      dispatch(
        getAllLicenses({
          headers: { "x-tenant-id": host },
        }),
      );

      dispatch(
        getLicensesCount({
          headers: { "x-tenant-id": host },
        }),
      );
    }
    dispatch(
      getAllRoleUsers({
        role: tenantType,
        headers: {
          "x-tenant-id": host,
        },
      }),
    );
  }, []);

  /*
      React Hook Form setup for user form
     
    
     
      Extracted helpers:
      - register:
        Connects input fields to React Hook Form, enabling value tracking,
        validation, and error handling.
     
      - handleSubmit:
        Wraps the form submit handler and ensures validation runs
        before invoking the submit callback.
     
      - setValue:
        Programmatically sets the value of a specific form field.
        Useful when values are updated via side effects or custom inputs.
     
      - watch:
        Subscribes to form field changes and allows reacting to value updates
        (e.g., conditional UI logic based on field values).
     
      - reset:
        Resets the entire form to default or provided values.
        Commonly used after successful submission or when switching users.
     
      - Controller:
        A wrapper component provided by React Hook Form that bridges
        controlled components (e.g. React Select, DatePicker)
        with the form state.
 
      - control:
        Core object used by React Hook Form to manage controlled components.
        Required when using <Controller /> to integrate third-party or
        custom inputs that do not expose a ref or do not work with `register`.
  
      - formState.errors:
        Contains validation errors for each registered field.
        Used to display field-level error messages in the UI.
     
      defaultValues:
      - Pre-populates the form when editing an existing user .
      - Falls back to sensible defaults for new user creation.
      - Normalizes backend values to match form field types
     */

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

    navigateFunction("/usermanagement", { replace: true });
  };

  const onSubmit = async (data: UserFormValues) => {
    data.assigned_apps = assignedApps;
    const host = new URL(window.location.href).hostname.split(".")[0];
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
        }),
      )
        .then(() => {
          setAssignedApps([]);

          dispatch(
            fetchUsers({
              url: `/users?tenant=${host}`,
            }),
          );
          onDiscard();
        })
        .catch((err) => {});
    }
  };

  const handleReset = (mode: any, id: any) => {
    navigateFunction("/usermanagement");
  };

  const BreadCrumbItems = [
    {
      title: "User Management",
      onClick: () => {
        navigateFunction("/usermanagement");
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
    const host = new URL(globalThis.location.href).hostname.split(".")[0];

    dispatch(
      getRoles({
        role: tenantType,
        headers: {
          "x-tenant-id": host,
        },
      }),
    );
  }, []);

  useEffect(() => {
    if (
      // (FormStatus?.mode == "edit" || FormStatus?.mode == "view") &&
      CurrData?.id &&
      allUsersRoles?.length > 0
    ) {
      const found = allUsersRoles.find((u) => u.user_id == CurrData.id);

      if (found) {
        const formatted = found.roles.map((r) => ({
          value: r.id,
          label: r.name,
        }));

        setDefaultUserRoleOptions(formatted);
        setValue(
          "role_ids",
          formatted.map((x) => x.value),
        );
      }
    }
  }, [FormStatus?.mode, CurrData, allUsersRoles]);

  useEffect(() => {}, [allDetails?.is_single_org, allRoles]);

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
      {
        <CreateUserComponent
          roleOptions={roleOptions}
          defaultUserRoleOptions={defaultUserRoleOptions}
          register={register}
          errors={errors}
          navigate={navigateFunction}
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
      }
    </div>
  );
}
