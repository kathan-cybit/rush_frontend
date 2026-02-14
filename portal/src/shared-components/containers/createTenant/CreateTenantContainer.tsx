import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import {
  createTenant,
  fetchTenants,
  updateTenant,
} from "../../../store/reducers/tenantSlice";
import { CreateTenantComponent } from "../../components";
import {
  getAllTenantsWithLicenses,
  getLicenseApps,
} from "../../../store/reducers/licenseSlice";
import { error_toast } from "../../../utils/toaster";

interface TenantFormValues {
  domainname: any;
  first_name: any;
  last_name: any;
  status: any;
  gstNumber?: any;
  adminemail?: any;
  password?: any;
  contactperson: any;
  contactemail: any;
  phoneNumber: any;
  singleOrganization: any;
}

interface LicensesState {
  microsoftTeam: number;
  powerPoint: number;
  outlook: number;
  excel: number;
}

interface FormStatus {
  mode: "view" | "edit" | null;
  tenant: any;
}

interface CreateTenantProps {
  // CurrData?: any;
  // FormStatus?: FormStatus;
  // setFormStatus?: any;
}

const CreateTenantContainer: React.FC<any> = ({
  navigateFunction,
  navigateFunctionWithState,
}: any) =>
  // {
  // CurrData = {},
  // FormStatus = { mode: null, tenant: null },
  // setFormStatus,
  // }
  {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    //since this component/file is common for create/update/view tenants, this is done to fetch the data for view/update if any
    //otherwise will continue a create tennat page
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

    const [licenses, setLicenses] = useState<any>([]);
    const handleLicenseChange = (
      applicationId: any,
      value: number | string,
    ) => {
      setLicenses((prev: any[]) =>
        prev.map((l) =>
          l.application_id == applicationId ? { ...l, count: value } : l,
        ),
      );
    };

    const { allApps, allTenantWithLicenses } = useSelector(
      (state: RootState) => state.license,
    );
    const { tenantType } = useSelector((state: RootState) => state.auth);
    const { isLoading } = useSelector((state: RootState) => state.tenant);

    useEffect(() => {
      const host = new URL(globalThis.location.href).hostname.split(".")[0];
      dispatch(
        getLicenseApps({
          role: tenantType,
          headers: {
            "x-tenant-id": host,
          },
        }),
      );
      if (host == "public") {
        dispatch(
          getAllTenantsWithLicenses({
            headers: { "x-tenant-id": "public" },
          }),
        );
      }
    }, []);
    /*
      React Hook Form setup for Tenant form
     
      useForm<TenantFormValues> initializes form state management and validation
      for the tenant create/edit flow.
     
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
        Commonly used after successful submission or when switching tenants.
     
      - formState.errors:
        Contains validation errors for each registered field.
        Used to display field-level error messages in the UI.
     
      defaultValues:
      - Pre-populates the form when editing an existing tenant (CurrData).
      - Falls back to sensible defaults for new tenant creation.
      - Normalizes backend values to match form field types
        (e.g., boolean → string for singleOrganization).
     */

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      watch,
      reset,
    } = useForm<TenantFormValues>({
      defaultValues: {
        domainname: CurrData?.domain || "",
        first_name: CurrData?.first_name || "",
        last_name: CurrData?.last_name || "",
        status: CurrData?.status || "active",
        gstNumber: CurrData?.gst || "",
        adminemail: "",
        password: "",
        contactperson: CurrData?.contactperson || "",
        contactemail: CurrData?.contactemail || "",
        phoneNumber: CurrData?.phonenumber || "",
        singleOrganization: CurrData?.is_single_org === true ? "true" : "false",
      },
    });

    //this field is to do the necessary ops for a org that is SINGLE USER
    const singleOrganizationWatcher = watch("singleOrganization");

    useEffect(() => {
      if (
        (FormStatus?.mode === "edit" || FormStatus?.mode === "view") &&
        CurrData
      ) {
        setValue("domainname", CurrData.domain || "");
        setValue("first_name", CurrData.first_name || "");
        setValue("last_name", CurrData.last_name || "");
        setValue("status", CurrData.status || "");
        setValue("gstNumber", CurrData.gst || "");
        setValue("contactperson", CurrData.contactperson || "");
        setValue("contactemail", CurrData.contactemail || "");
        setValue("phoneNumber", CurrData.phonenumber || "");
        setValue(
          "singleOrganization",
          CurrData?.is_single_org === true ? "true" : "false",
        );

        if (allApps?.length && allTenantWithLicenses?.length && CurrData?.id) {
          const tenant = allTenantWithLicenses.find(
            (t: any) => t.tenant_id === CurrData.id,
          );
          //in the database, this field/column of licenses object will have application_id along with COUNT that is TOTAL LICENSES
          //  i.e licenses count that are in TOTAL per application
          //thus the calculation and setting
          const initialLicenses = allApps.map((app: any) => ({
            application_id: app.id,
            count:
              tenant?.licenses?.filter((l: any) => l.application_id == app.id)
                ?.length || 0,
          }));

          setLicenses(initialLicenses);
        }
      }
    }, [FormStatus?.mode, allApps, CurrData, setValue, allTenantWithLicenses]);

    const onSubmit = async (data: TenantFormValues) => {
      const host = new URL(window.location.href).hostname.split(".")[0];

      if (!FormStatus?.mode) {
        await dispatch(
          createTenant({
            payload: {
              admin_email: data.adminemail,
              password: data.password,
              first_name: data.first_name,
              last_name: data.last_name,
              domain: data.domainname,
              gst: data.gstNumber,
              status: data.status,
              phonenumber: data.phoneNumber,
              contactperson: data.contactperson,
              contactemail: data.contactemail,
              singleOrganization:
                data.singleOrganization == "true" ||
                data.singleOrganization === true
                  ? true
                  : false,
              licenses: licenses?.map((lic: any) => ({
                ...lic,
                count: Number(lic.count),
              })),
              schema_name: data.domainname,
            },
            currentTenant: host,
          }),
        )
          .unwrap()
          .then(() => {
            reset();
            const initialLicenses = allApps.map((app: any) => ({
              application_id: app.id,
              count: 0,
            }));
            setLicenses(initialLicenses);
            // setFormStatus?.({ mode: null, tenant: null });
            navigateFunction("/dashboard");
          })
          .catch(() => {});
      } else if (FormStatus?.mode === "edit" && CurrData?.id) {
        await dispatch(
          updateTenant({
            payload: {
              updated_at: new Date(),
              first_name: data.first_name,
              last_name: data.last_name,
              gst: data.gstNumber,
              status: data.status,
              phonenumber: data.phoneNumber,
              contactperson: data.contactperson,
              contactemail: data.contactemail,
              is_single_org: data.singleOrganization == "true" ? true : false,
              licenses: licenses?.map((lic: any) => ({
                ...lic,
                count: Number(lic.count),
              })),
            },
            id: CurrData.id,
          }),
        )
          .unwrap()
          .then(() => {
            reset();
            const initialLicenses = allApps.map((app: any) => ({
              application_id: app.id,
              count: 0,
            }));
            setLicenses(initialLicenses);
            // setFormStatus?.({ mode: null, tenant: null });
            dispatch(fetchTenants(host));
            navigateFunction("/dashboard");
          })
          .catch(() => {});
      }
    };

    // uncomment for single org and comnet below useefcfect
    // useEffect(() => {
    //   if (
    //     (allApps?.length > 0 && !FormStatus?.mode) ||
    //     ((singleOrganizationWatcher === true ||
    //       singleOrganizationWatcher == "true") &&
    //       !licenses?.some((license) => Number(license.count) > 1))
    //   ) {
    //     const initialLicenses = allApps.map((app: any) => ({
    //       application_id: app.id,
    //       count: "0",
    //     }));
    //     setLicenses(initialLicenses);
    //   }
    // }, [allApps, FormStatus?.mode, singleOrganizationWatcher]);

    useEffect(() => {
      if (allApps?.length > 0 && !FormStatus?.mode) {
        const initialLicenses = allApps.map((app: any) => ({
          application_id: app.id,
          count: "0",
        }));
        setLicenses(initialLicenses);
      }
    }, [allApps, FormStatus?.mode]);

    useEffect(() => {
      if (
        (singleOrganizationWatcher == "true" ||
          singleOrganizationWatcher === true) &&
        CurrData?.totalusers > 1
      ) {
        error_toast(
          "Single User Organization cannot be enabled because more than one user exists for this tenant.",
        );
        setValue("singleOrganization", "false");
      }
    }, [singleOrganizationWatcher, CurrData?.totalusers, setValue]);

    const onDiscard = () => {
      reset();
      navigateFunction("/dashboard");
    };

    const handleReset = (
      e: "view" | "edit" | null,
      id: string | number | null,
    ) => {
      navigateFunction("/dashboard");
    };

    const BreadCrumbItems = [
      {
        title: "Tenants",
        onClick: () => {
          handleReset(null, null);
          navigateFunction("/dashboard");
        },
      },
      {
        title:
          FormStatus?.mode == "edit"
            ? "Edit Tenant"
            : FormStatus?.mode == "view"
              ? "View Tenant"
              : "New Tenant",
      },
    ];

    const componentProps = {
      isLoading,
      register,
      errors,
      licenses,
      FormStatus,
      allApps,
      CurrData,
      handleLicenseChange,
      onDiscard,
      handleSubmit: handleSubmit(onSubmit),
      handleReset,
      BreadCrumbItems,
      allTenantWithLicenses,
      singleOrganizationWatcher,
      navigateFunction,
      navigateFunctionWithState,
    };

    return <CreateTenantComponent {...(componentProps as any)} />;
  };

export default CreateTenantContainer;
