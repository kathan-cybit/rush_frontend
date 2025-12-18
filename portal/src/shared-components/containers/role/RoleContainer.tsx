import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoleComponent } from "../../components";
import {
  addPermissonRole,
  addPermssion,
  addRole,
  getAllPermissonRole,
  getPermissonRole,
  getPermssion,
  getRoles,
} from "../../../store/reducers/tenantSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { useForm } from "react-hook-form";
import { error_toast } from "../../../utils/toaster";
import EditIcn from "../../../assets/svgs/EditIcn";

export default function RoleContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { tenantType } = useSelector((state: RootState) => state.auth);
  const subDomain = new URL(window.location.href).hostname.split(".")[0];

  const isLoading = useSelector((state: any) => state.tenant.isLoading);

  const allPermissions =
    useSelector((state: any) => state.tenant.allpermissions) || [];
  const permissionsRoles =
    useSelector((state: any) => state.tenant.permissionsRoles) || [];
  const allRoles = useSelector((state: any) => state.tenant.allRoles) || [];
  const allpermissionsroles =
    useSelector((state: any) => state.tenant.allpermissionsroles) || [];

  const menuItems = [
    {
      label: "Edit",
      color: "blue",
      icon: <EditIcn color="#228be6" />,
      onClick: (row: any) => {
        handleModalOpen(row?.id);
      },
    },
  ];

  const statusColorMap = {};

  const {
    control: controlAssign,
    handleSubmit: handleSubmitAssign,
    setValue,
    reset,
  } = useForm<any>({
    defaultValues: {
      role: null,
      permission_ids: [],
    },
  });

  const [Roleform, setRoleForm] = useState({
    name: "",
    description: "",
    permissions: [],
    organization_id: 1,
  });

  const [EditRole, setEditRole] = useState({ open: false, roleId: null });
  const [OpenCreateRole, setOpenCreateRole] = useState(false);
  const [CurrData, setCurrData] = useState<any>({});
  const handleModalClose = () => {
    setEditRole({ open: false, roleId: null });
  };

  const handleModalOpen = (id: any) => {
    setEditRole({ open: true, roleId: id });
    setCurrData(allRoles.find((e) => e.id === id) || {});
  };

  const submitAssign = async (data: any) => {
    const payload = {
      role_id: CurrData?.id,
      organization_id: CurrData?.organization_id || 1,
      permission_id: (data.permission_ids || []).map((p: any) => p.value),
    };

    await dispatch(
      addPermissonRole({
        role: tenantType,
        payload,
        headers: { "x-tenant-id": subDomain },
      })
    )
      .unwrap()
      .then(() => {
        reset();
        handleModalClose();
      })
      .catch(() => {});
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   const payload = {
  //     name: Roleform.name || "-",
  //     description: Roleform.description || "-",
  //     organization_id: 1,
  //   };

  //   await dispatch(
  //     addRole({
  //       role: tenantType,
  //       payload,
  //       headers: { "x-tenant-id": subDomain },
  //     })
  //   )
  //     .unwrap()
  //     .then(() => {
  //       setRoleForm({
  //         name: "",
  //         description: "",
  //         organization_id: 1,
  //       });
  //       setOpenCreateRole(false);
  //     })
  //     .catch(() => {});
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      Roleform?.name == "" ||
      Roleform?.name == null ||
      Roleform?.name == undefined
    ) {
      error_toast("Role name cannot be empty");
      return;
    }
    const payload = {
      name: Roleform.name.trim() || "-",
      description: Roleform.description.trim() || "-",
      organization_id: 1,
      permission_ids: Roleform.permissions.map((p: any) => p.value),
    };

    await dispatch(
      addRole({
        role: tenantType,
        payload,
        headers: { "x-tenant-id": subDomain },
      })
    )
      .unwrap()
      .then(() => {
        setRoleForm({
          name: "",
          description: "",
          permissions: [],
          organization_id: 1,
        });
        setOpenCreateRole(false);
      })
      .catch(() => {});
  };

  const onChangeRoleForm = (e: any) => {
    setRoleForm({ ...Roleform, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (EditRole?.open || OpenCreateRole) {
      dispatch(
        getPermssion({
          role: tenantType,
          headers: {
            "x-tenant-id": subDomain,
          },
        })
      );
    }

    dispatch(
      getAllPermissonRole({
        role: tenantType,
        headers: {
          "x-tenant-id": subDomain,
        },
      })
    );

    if (EditRole?.open && EditRole?.roleId) {
      dispatch(
        getPermissonRole({
          role: tenantType,
          id: EditRole?.roleId,
          headers: {
            "x-tenant-id": subDomain,
          },
        })
      );
    }
  }, [EditRole, OpenCreateRole]);

  useEffect(() => {
    dispatch(
      getRoles({
        role: tenantType,
        headers: {
          "x-tenant-id": subDomain,
        },
      })
    );
  }, [OpenCreateRole]);

  const selectedPermissionIds = useMemo(() => {
    return (permissionsRoles || []).map((item) => item.Permission?.id);
  }, [permissionsRoles]);

  const permissionOptions = useMemo(() => {
    return (allPermissions || []).map((p: any) => ({
      value: p.id,
      label: p.name,
    }));
  }, [allPermissions]);

  const preSelectedOptions = useMemo(() => {
    return permissionOptions.filter((opt) =>
      selectedPermissionIds.includes(opt.value)
    );
  }, [permissionOptions, selectedPermissionIds]);

  const permissionMap = useMemo(() => {
    return Object.fromEntries(
      allpermissionsroles.map((r) => [
        r.role_id,
        r.permissions.map((p) => p.name).join(", "),
      ])
    );
  }, [allpermissionsroles, EditRole]);

  const formattedRoles = useMemo(() => {
    return allRoles?.map((role) => ({
      id: role.id,
      role: role.name,
      description: role.description,
      permissions: permissionMap[role.id] || "None",
    }));
  }, [allRoles, permissionMap]);

  useEffect(() => {
    setValue("permission_ids", preSelectedOptions);
  }, [permissionsRoles, allPermissions]);

  return (
    <div className="">
      <div className="mx-auto">
        <div className="p-4">
          <RoleComponent
            permissionOptions={permissionOptions}
            menuItems={menuItems}
            statusColorMap={statusColorMap}
            formattedRoles={formattedRoles}
            handleModalClose={handleModalClose}
            EditRole={EditRole}
            CurrData={CurrData}
            OpenCreateRole={OpenCreateRole}
            setOpenCreateRole={setOpenCreateRole}
            controlAssign={controlAssign}
            handleSubmitAssign={handleSubmitAssign}
            Roleform={Roleform}
            setRoleForm={setRoleForm}
            submitAssign={submitAssign}
            handleSubmit={handleSubmit}
            onChangeRoleForm={onChangeRoleForm}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
