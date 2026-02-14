import React, { useEffect, useState } from "react";
import {
  DeleteIcon,
  EditIcon,
  EyeIcon,
  ResendIconSimple,
} from "../../../assets/svgs";
import {
  deleteTenantUser,
  fetchUsers,
  getAllRoleUsers,
} from "../../../store/reducers/tenantSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { UserComponent } from "../../components";
import {
  getUserDetails,
  resenndVerifyEmail,
} from "../../../store/reducers/authSlice";
import { formatUtcToIST } from "../../../utils/commonFunctions";
import { getLicenseApps } from "../../../store/reducers/licenseSlice";

import { USersFile } from "../../../assets/img";
import { error_toast } from "../../../utils/toaster";

export default function UserContainer({
  navigateFunction,
  navigateWithState,
}: any) {
  const host = new URL(globalThis.location.href).hostname.split(".")[0];

  const dispatch = useDispatch<AppDispatch>();
  const { users: userData, isLoading: loading } = useSelector(
    (state: RootState) => state.tenant,
  );

  const {
    tenantType,
    user,
    allDetails,
    loading: loading2,
  } = useSelector((state: RootState) => state.auth);

  const { currentTenantName } = useSelector((state: RootState) => state.auth);
  const allUsersRoles =
    useSelector((state: any) => state.tenant.allUsersRoles) || [];

  const { allApps } = useSelector((state: RootState) => state.license);
  const [ConfirmDelete, setConfirmDelete] = useState<any>({
    mode: false,
    row: null,
  });
  const modalClose = () => {
    setConfirmDelete({ mode: false, row: null });
  };
  const [FormStatus, setFormStatus] = useState({
    mode: null,
    userId: null,
  });

  const [displayAlert, setdisplayAlert] = useState(false);
  const [OpenForm, setOpenForm] = useState(false);

  const [ErrorAlert, setErrorAlert] = useState("");
  const [selectedAction, setSelectedAction] = useState<any>(null);

  const actionOptions = [
    { value: "bulk", label: "Bulk Upload" },
    { value: "download", label: "Download Sample File" },
  ];

  const handleActionChange = (option: any) => {
    if (!option) return;

    switch (option.value) {
      case "download":
        window.open(USersFile, "_blank");
        break;

      case "bulk":
        setOpenForm(true);
        break;
    }

    setSelectedAction(null);
  };

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

    {
      label: "Delete",
      color: "#ef4444",
      icon: <DeleteIcon color="#ef4444" />,
      onClick: (row: any) => {
        if (row.id == user.id) {
          error_toast("You cannot delete yourself");
          return;
        }
        const x: any = userData.find((e: any) => e.id == row.id);
        if (x?.is_default_admin) {
          error_toast("Default admin cannot be deleted");
          return;
        }
        setConfirmDelete({ mode: true, row: row });
      },
    },

    // {
    //       role: tenantType,
    //       headers: {
    //         "x-tenant-id": host,
    //       },
    //     }
  ];
  const deleteEntry = async (row: any, host: any, tenantType: any) => {
    dispatch(
      deleteTenantUser({
        id: row?.id,
        headers: { "x-tenant-id": host },
      }),
    )
      .unwrap()
      .then(() => {
        modalClose();
      })
      .catch(() => {});
  };
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
        navigateWithState("/viewuser", {
          state: {
            CurrData: data,
            FormStatus: FormStatus,
          },
        });
      } else {
        navigateWithState("/updateuser", {
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
    if (!ConfirmDelete?.mode) {
      if (currentTenantName && !OpenForm) {
        dispatch(
          fetchUsers({
            url: `/users?tenant=${currentTenantName}`,
          }),
        );
      }
      dispatch(
        getLicenseApps({
          role: tenantType,
          headers: { "x-tenant-id": host },
        }),
      );
      if (host != "public") {
        dispatch(
          getUserDetails({
            headers: { "x-tenant-id": host },
          }),
        );
      }
    }
  }, [currentTenantName, OpenForm, ConfirmDelete]);

  useEffect(() => {
    if (!ConfirmDelete?.mode) {
      if (!OpenForm)
        dispatch(
          getAllRoleUsers({
            role: tenantType,
            headers: {
              "x-tenant-id": host,
            },
          }),
        );
    }
  }, [FormStatus.mode, userData, OpenForm, ConfirmDelete]);

  //formated data to feed in for table
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
          <button
            onClick={() => {
              dispatch(
                resenndVerifyEmail({
                  payload: { email: e?.email || "" },
                  headers: {
                    "x-tenant-id": host,
                  },
                }),
              )
                .then(() => {
                  dispatch(
                    fetchUsers({
                      url: `/users?tenant=${currentTenantName}`,
                    }),
                  );
                })
                .catch(() => {});
            }}
          >
            <ResendIconSimple color={"#666"} />
          </button>
        ) : (
          "Verified"
        ),
      //this thing is done so that to get the latest updated entry to be shown first

      "Created At": formatUtcToIST(e.created_at),
      "Last Updated": formatUtcToIST(e.updated_at),
      //  helper field for sorting (not changing UI)
      _updatedAtRaw: e?.updated_at,
    }))
    ?.sort(
      (a: any, b: any) =>
        new Date(b._updatedAtRaw).getTime() -
        new Date(a._updatedAtRaw).getTime(),
    )
    ?.map(({ _updatedAtRaw, ...rest }: any) => rest);

  //this below operations are for custom tooltip displays
  //here, we will keep the field of custom tooltip we want to be displayed in the ignoreArray.
  //  The rest of the field's value will be kept null since being absent in the ignoreArray.|
  // for verified text the tolltip is simply verified while for button it is click to verify
  const ignoreArray = ["isVerified"];

  // the tooltipObj will thus have all keys of the columns as null values except the button's column with its value correspondingly.

  //NOW, if u will see the chnages in TABLEV2 of your custom library made , if tooltipObj's key's value found null, then it will naturally take the content itself as tooltip which is  what the older version is doing.
  //but, for the custom tootip's key , if not null it will get the value as tooltip that we provide
  //NOTE:- PLEASE REFER THE TABLEV2 component chnages

  const tooltipObj = formattedTenants?.map((row) => {
    const obj = {};

    for (const [key, value] of Object.entries(row)) {
      if (!ignoreArray.includes(key)) {
        obj[key] = null;
      } else if (typeof value == "string") {
        obj[key] = "Verified";
      } else {
        obj[key] = "Click to verify";
      }
    }

    return obj;
  });

  const BreadCrumbItems = [
    {
      title: "Home",
      onClick: () => {
        navigateFunction("/dashboard");
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
    selectedAction,
    setErrorAlert,
    handleActionChange,
    actionOptions,
    ErrorAlert,
    tooltipObj,
    tenantType,
    modalClose,
    deleteEntry,
    ConfirmDelete,
    navigateFunction,
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
