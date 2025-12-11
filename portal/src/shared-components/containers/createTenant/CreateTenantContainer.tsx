import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import {
  createTenant,
  fetchTenants,
  getApps,
  updateTenant,
} from "../../../store/reducers/tenantSlice";
import { CreateTenantComponent } from "../../components";

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

  // const [licenses, setLicenses] = useState<LicensesState>({
  //   microsoftTeam: 0,
  //   powerPoint: 0,
  //   outlook: 0,
  //   excel: 0,
  // });

  const handleLicenseChange = (app: keyof LicensesState, value: number) => {
    setLicenses((prev) => ({ ...prev, [app]: value }));
  };

  const allApps = useSelector((state: RootState) => state.tenant.allApps);
  const { roleType } = useSelector((state: RootState) => state.auth);
  // const [licenses, setLicenses] = useState<any>({});
  const [licenses, setLicenses] = useState<any>(() => {
    const initialLicenses: any = {};
    allApps?.forEach((app: any) => {
      initialLicenses[app.name] = 0;
    });
    return initialLicenses;
  });

  useEffect(() => {
    const host = new URL(window.location.href).hostname.split(".")[0];
    dispatch(
      getApps({
        role: roleType,
        headers: {
          "x-tenant-id": host,
        },
      })
    );
  }, []);

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

      // if (CurrData.licenses) {
      //   setLicenses({
      //     microsoftTeam: CurrData.licenses.microsoftTeam || 0,
      //     powerPoint: CurrData.licenses.powerPoint || 0,
      //     outlook: CurrData.licenses.outlook || 0,
      //     excel: CurrData.licenses.excel || 0,
      //   });
      // }
      if (allApps?.length) {
        const dynamicLicenses: any = {};
        allApps.forEach((app: any) => {
          dynamicLicenses[app.name] = CurrData?.licenses?.[app.name] || 0;
        });
        setLicenses(dynamicLicenses);
      }
    }
  }, [FormStatus?.mode, allApps, CurrData, setValue]);

  const onSubmit = async (data: TenantFormValues) => {
    const host = new URL(window.location.href).hostname.split(".")[0];
    const filteredLicenses: any = Object.fromEntries(
      Object.entries(licenses).filter(([_, value]) => Number(value) > 0)
    );

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
            licenses: filteredLicenses,
            schema_name: data.domainname,
          },
          currentTenant: host,
        })
      )
        .unwrap()
        .then(() => {
          reset();
          setLicenses({
            microsoftTeam: 0,
            powerPoint: 0,
            outlook: 0,
            excel: 0,
          });
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
            licenses: filteredLicenses,
          },
          id: CurrData.id,
        })
      )
        .unwrap()
        .then(() => {
          reset();
          setLicenses({
            microsoftTeam: 0,
            powerPoint: 0,
            outlook: 0,
            excel: 0,
          });
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
    register,
    errors,
    licenses,
    FormStatus,
    CurrData,
    handleLicenseChange,
    onDiscard,
    handleSubmit: handleSubmit(onSubmit),
    navigate: navigate,
    handleReset,
    BreadCrumbItems,
  };

  return <CreateTenantComponent {...(componentProps as any)} />;
};

export default CreateTenantContainer;
