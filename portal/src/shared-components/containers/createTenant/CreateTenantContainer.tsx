import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

interface TenantFormValues {
  domainname: any;
  company_name: any;
  status: any;
  gstNumber?: any;
  adminemail?: any;
  password?: any;
  contactperson: any;
  contactemail: any;
  phoneNumber: any;
  singleOrganization: boolean | string | any;
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
  CurrData?: any;
  FormStatus?: FormStatus;
  setFormStatus?: any;
}

const CreateTenantContainer: React.FC<CreateTenantProps> = ({
  CurrData = {},
  FormStatus = { mode: null, tenant: null },
  setFormStatus,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [licenses, setLicenses] = useState<any>([]);
  // const handleLicenseChange = (applicationId: any, value: any) => {
  //   setLicenses((prevLicenses: any) => {
  //     return prevLicenses.map((license: any) => {
  //       if (license.application_id == applicationId) {
  //         return {
  //           ...license,
  //           count: value,
  //         };
  //       }

  //       return license;
  //     });
  //   });
  // };
  const handleLicenseChange = (
    applicationId: any | string,
    value: number | string
  ) => {
    setLicenses((prev: any[]) =>
      prev.map((l) =>
        l.application_id == applicationId ? { ...l, count: value } : l
      )
    );
  };

  const { allApps, allLicenses, allTenantWithLicenses } = useSelector(
    (state: RootState) => state.license
  );
  const { tenantType } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.tenant);

  useEffect(() => {
    const host = new URL(window.location.href).hostname.split(".")[0];
    dispatch(
      getLicenseApps({
        role: tenantType,
        headers: {
          "x-tenant-id": host,
        },
      })
    );
    if (host == "public") {
      dispatch(
        getAllTenantsWithLicenses({
          headers: { "x-tenant-id": "public" },
        })
      );
    }
  }, []);

  useEffect(() => {
    if (allApps?.length > 0 && !FormStatus?.mode) {
      // Create mode: Initialize with all apps with count 0
      const initialLicenses = allApps.map((app: any) => ({
        application_id: app.id,
        count: "0",
      }));
      setLicenses(initialLicenses);
    }
  }, [allApps, FormStatus?.mode]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TenantFormValues>({
    defaultValues: {
      domainname: CurrData?.domain || "",
      company_name: CurrData?.company_name || "",
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
  useEffect(() => {
    if (
      (FormStatus?.mode === "edit" || FormStatus?.mode === "view") &&
      CurrData
    ) {
      setValue("domainname", CurrData.domain || "");
      setValue("company_name", CurrData.company_name || "");
      setValue("status", CurrData.status || "");
      setValue("gstNumber", CurrData.gst || "");
      setValue("contactperson", CurrData.contactperson || "");
      setValue("contactemail", CurrData.contactemail || "");
      setValue("phoneNumber", CurrData.phonenumber || "");
      setValue(
        "singleOrganization",
        CurrData?.is_single_org === true ? "true" : "false"
      );

      // if (allApps?.length) {
      //   const existingLicensesMap = new Map();
      //   if (CurrData?.licenses && Array.isArray(CurrData.licenses)) {
      //     CurrData.licenses.forEach((license) => {
      //       existingLicensesMap.set(license.application_id, license);
      //     });
      //   }

      //   const finalLicenses = allApps.map((app: any) => {
      //     const existingLicense = existingLicensesMap.get(app.id);

      //     if (existingLicense) {
      //       return existingLicense;
      //     } else {
      //       return {
      //         application_id: app.id,
      //         count: "0",
      //       };
      //     }
      //   });

      //   setLicenses(finalLicenses);
      // }
      if (allApps?.length && allTenantWithLicenses?.length && CurrData?.id) {
        const tenant = allTenantWithLicenses.find(
          (t: any) => t.tenant_id === CurrData.id
        );

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
            company_name: data.company_name,
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
        })
      )
        .unwrap()
        .then(() => {
          reset();
          const initialLicenses = allApps.map((app: any) => ({
            application_id: app.id,
            count: 0,
          }));
          setLicenses(initialLicenses);
          setFormStatus?.({ mode: null, tenant: null });
          navigate("/dashboard");
        })
        .catch(() => {});
    } else if (FormStatus?.mode === "edit" && CurrData?.id) {
      await dispatch(
        updateTenant({
          payload: {
            company_name: data.company_name,
            gst: data.gstNumber,
            status: data.status,
            phonenumber: data.phoneNumber,
            contactperson: data.contactperson,
            contactemail: data.contactemail,
            singleOrganization:
              data.singleOrganization == "true" ? true : false,
            licenses: licenses?.map((lic: any) => ({
              ...lic,
              count: Number(lic.count),
            })),
          },
          id: CurrData.id,
        })
      )
        .unwrap()
        .then(() => {
          reset();
          const initialLicenses = allApps.map((app: any) => ({
            application_id: app.id,
            count: 0,
          }));
          setLicenses(initialLicenses);
          setFormStatus?.({ mode: null, tenant: null });
          dispatch(fetchTenants(host));
          navigate("/dashboard");
        })
        .catch(() => {});
    }
  };

  const onDiscard = () => {
    reset();
    setFormStatus?.({ mode: null, tenant: null });
    navigate("/dashboard");
  };

  const handleReset = (
    e: "view" | "edit" | null,
    id: string | number | null
  ) => {
    setFormStatus?.({ tenant: id, mode: e });
  };

  const BreadCrumbItems = [
    {
      title: "Tenants",
      onClick: () => {
        handleReset(null, null);
        navigate("/dashboard");
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
    navigate: navigate,
    handleReset,
    BreadCrumbItems,
    allTenantWithLicenses,
  };

  return <CreateTenantComponent {...(componentProps as any)} />;
};

export default CreateTenantContainer;
