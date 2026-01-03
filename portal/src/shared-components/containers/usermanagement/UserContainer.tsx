import React, { useEffect, useMemo, useState } from "react";
import { EditIcon, EyeIcon, ResendIconSimple } from "../../../assets/svgs";
import {
  fetchUsers,
  getAllRoleUsers,
} from "../../../store/reducers/tenantSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { UserComponent } from "../../components";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  resenndVerifyEmail,
} from "../../../store/reducers/authSlice";
import { formatUtcToIST } from "../../../utils/commonFunctions";
import { getLicenseApps } from "../../../store/reducers/licenseSlice";
import { Tooltip } from "../../ui";

export default function UserContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users: userData, isLoading: loading } = useSelector(
    (state: RootState) => state.tenant
  );

  const {
    tenantType,
    user,
    allDetails,
    loading: loading2,
  } = useSelector((state: RootState) => state.auth);
  const [FormStatus, setFormStatus] = useState({
    mode: null,
    userId: null,
  });

  const [displayAlert, setdisplayAlert] = useState(false);
  const [OpenForm, setOpenForm] = useState(false);
  const host = new URL(window.location.href).hostname.split(".")[0];
  const { currentTenantName } = useSelector((state: RootState) => state.auth);
  const allUsersRoles =
    useSelector((state: any) => state.tenant.allUsersRoles) || [];

  const { allApps } = useSelector((state: RootState) => state.license);

  const menuItems = [
    {
      label: "View",
      icon: <EyeIcon className="" color="#000" />,
      onClick: (row: any) => {
        handleViewUser(row);
      },
    },
    {
      label: "Edit",
      color: "blue",
      icon: <EditIcon color="#228be6" />,
      onClick: (row: any) => {
        handleEditUser(row);
      },
    },
  ];

  const statusColorMap = {
    active: "green",
    inactive: "red",
  };

  useEffect(() => {
    if (
      FormStatus.userId &&
      (FormStatus.mode == "view" || FormStatus.mode == "edit")
    ) {
      const data = userData.find((e: any) => e.id === FormStatus.userId);

      if (FormStatus.mode == "view") {
        navigate("/viewuser", {
          state: {
            CurrData: data,
            FormStatus: FormStatus,
          },
        });
      } else {
        navigate("/updateuser", {
          state: {
            CurrData: data,
            FormStatus: FormStatus,
          },
        });
      }
    }
  }, [FormStatus, userData]);

  const handleViewUser = (row: any) => {
    setFormStatus({ mode: "view", userId: row.id });
  };

  const handleEditUser = (row: any) => {
    setFormStatus({ mode: "edit", userId: row.id });
  };

  useEffect(() => {
    if (currentTenantName && !OpenForm) {
      dispatch(
        fetchUsers({
          url: `/users?tenant=${currentTenantName}`,
        })
      );
    }
    dispatch(
      getLicenseApps({
        role: tenantType,
        headers: { "x-tenant-id": host },
      })
    );
    if (host != "public") {
      dispatch(
        getUserDetails({
          headers: { "x-tenant-id": host },
        })
      );
    }
  }, [currentTenantName, OpenForm]);

  useEffect(() => {
    if (!OpenForm)
      dispatch(
        getAllRoleUsers({
          role: tenantType,
          headers: {
            "x-tenant-id": host,
          },
        })
      );
  }, [FormStatus.mode, userData, OpenForm]);

  const formattedTenants = userData
    ?.map((e: any) => ({
      id: e?.id,
      username: e.first_name + " " + e?.last_name,
      status: e.status,
      email: e.email,
      "phone number": e.phonenumber,

      "Assigned Apps":
        Array.isArray(e?.assigned_apps) && Array.isArray(allApps)
          ? allApps
              .filter((app: any) => e.assigned_apps.includes(app.id))
              .map((app: any) => app.name)
              .sort()
              .join(", ") || "N/A"
          : "N/A",
      roles:
        allUsersRoles
          .find((u) => u.user_id == e?.id)
          ?.roles.map((role) => role.name)
          .sort()
          .join(", ") || "N/A",
      isVerified:
        (e?.is_default_admin === false || e?.is_default_admin == "false") &&
        (e?.is_verified === false || e?.is_verified == "false") ? (
          <>
            {/* <Tooltip label="Resend verification email"> */}
            <button
              // className="inline-flex float-end float-left items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
              onClick={() => {
                dispatch(
                  resenndVerifyEmail({
                    payload: { email: e?.email || "" },
                    headers: {
                      "x-tenant-id": host,
                    },
                  })
                )
                  .then(() => {
                    dispatch(
                      fetchUsers({
                        url: `/users?tenant=${currentTenantName}`,
                      })
                    );
                  })
                  .catch(() => {});
              }}
            >
              <ResendIconSimple color={"#666"} />
            </button>
            {/* </Tooltip> */}
          </>
        ) : (
          "Verified"
        ),
      "Created At": formatUtcToIST(e.created_at),
      "Last Updated": formatUtcToIST(e.updated_at),
      // 🔹 helper field for sorting (not changing UI)
      _updatedAtRaw: e?.updated_at,
    }))
    ?.sort(
      (a: any, b: any) =>
        new Date(b._updatedAtRaw).getTime() -
        new Date(a._updatedAtRaw).getTime()
    )
    ?.map(({ _updatedAtRaw, ...rest }: any) => rest);

  const BreadCrumbItems = [
    {
      title: "Home",
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      title: "User Management",
    },
  ];

  const roleProps = {
    loading,
    userData,
    FormStatus,

    handleViewUser,
    handleEditUser,
    setFormStatus,
    formattedTenants,
    statusColorMap,
    menuItems,
    allUsersRoles,
    user,
    host,
    OpenForm,
    setOpenForm,
    displayAlert,
    setdisplayAlert,
    allDetails,
    loading2,
    BreadCrumbItems,
  };

  return (
    <div>
      <div className="mx-auto">
        <div className="p-4">
          <UserComponent {...roleProps} />
        </div>
      </div>
    </div>
  );
}
