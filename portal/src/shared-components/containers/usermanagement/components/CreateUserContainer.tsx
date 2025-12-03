import React, { useEffect, useState } from "react";
import { CreateUserComponent } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createTenantUser,
  fetchUsers,
  updateTenantUser,
} from "../../../../store/reducers/tenantSlice";

interface UserFormValues {
  name: string;
  email: string;
  password?: string;
  phonenumber: string;
  status: string;
  assigned_apps: string[];
}

interface FormStatus {
  mode: "view" | "edit" | null;
  userId: any;
}

export default function CreateUserContainer({
  CurrData = {},
  FormStatus = { mode: null, userId: null },
  setFormStatus,
}: any) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [assignedApps, setAssignedApps] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      name: CurrData?.name || "",
      email: CurrData?.email || "",
      password: "",
      phonenumber: CurrData?.phonenumber || "",
      status: CurrData?.status || "active",
      assigned_apps: CurrData?.assigned_apps || [],
    },
  });

  useEffect(() => {
    if (FormStatus?.mode && CurrData) {
      setValue("name", CurrData.name);
      setValue("email", CurrData.email);
      setValue("phonenumber", CurrData.phonenumber);
      setValue("status", CurrData.status);
      setAssignedApps(CurrData.assigned_apps || []);
    }
  }, [CurrData, FormStatus?.mode]);

  const onSubmit = async (data: UserFormValues) => {
    data.assigned_apps = assignedApps;
    const host = new URL(window.location.href).hostname.split(".")[0];
    if (!FormStatus?.mode) {
      await dispatch(createTenantUser({ payload: data, currentTenant: host }))
        .unwrap()
        .then(() => {
          reset();
          setAssignedApps([]);
          navigate("/usermanagement");
        })
        .catch(() => {});
    } else {
      await dispatch(
        updateTenantUser({
          id: CurrData.id,
          payload: data,
          currentTenant: host,
        })
      )
        .unwrap()
        .then(() => {
          reset();
          if (setFormStatus) {
            setFormStatus({ mode: null, userId: null });
          }
          setAssignedApps([]);
          dispatch(
            fetchUsers({
              url: `http://localhost:8080/api/users?tenant=${host}`,
            })
          );
          navigate("/usermanagement");
        })
        .catch(() => {});
    }
  };

  const onDiscard = () => {
    reset();
    if (setFormStatus) {
      setFormStatus({ mode: null, userId: null });
    }
    navigate("/usermanagement");
  };

  const handleReset = (mode: any, id: any) => {
    if (setFormStatus) {
      setFormStatus({ mode, userId: id });
    }
  };

  const BreadCrumbItems = [
    {
      title: "User Management",
      onClick: () => {
        if (setFormStatus) {
          setFormStatus({ userId: null, mode: null });
        }
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

  return (
    <div>
      <CreateUserComponent
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
      />
    </div>
  );
}
