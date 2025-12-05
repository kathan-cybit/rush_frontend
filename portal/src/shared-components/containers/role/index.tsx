import React, { useEffect, useState } from "react";
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

export default function RoleContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { roleType } = useSelector((state: RootState) => state.auth);

  const allPermissions =
    useSelector((state: any) => state.tenant.allpermissions) || [];
  const permissionsRoles =
    useSelector((state: any) => state.tenant.permissionsRoles) || [];
  const allRoles = useSelector((state: any) => state.tenant.allRoles) || [];
  const allpermissionsroles =
    useSelector((state: any) => state.tenant.allpermissionsroles) || [];

  const [EditRole, setEditRole] = useState({ open: false, roleId: null });
  const [OpenCreateRole, setOpenCreateRole] = useState(false);
  const [CurrData, setCurrData] = useState({});
  const handleModalClose = () => {
    setEditRole({ open: false, roleId: null });
  };

  const handleModalOpen = (id: any) => {
    setEditRole({ open: true, roleId: id });
    setCurrData(allRoles.find((e) => e.id === id) || {});
  };

  useEffect(() => {
    const subDomain = new URL(window.location.href).hostname.split(".")[0];
    if (EditRole?.open || OpenCreateRole) {
      dispatch(
        getPermssion({
          role: roleType,
          headers: {
            "x-tenant-id": subDomain,
          },
        })
      );
    }

    dispatch(
      getAllPermissonRole({
        role: roleType,
        headers: {
          "x-tenant-id": subDomain,
        },
      })
    );

    if (EditRole?.open && EditRole?.roleId) {
      dispatch(
        getPermissonRole({
          role: roleType,
          id: EditRole?.roleId,
          headers: {
            "x-tenant-id": subDomain,
          },
        })
      );
    }
  }, [EditRole, OpenCreateRole]);

  useEffect(() => {
    const subDomain = new URL(window.location.href).hostname.split(".")[0];
    dispatch(
      getRoles({
        role: roleType,
        headers: {
          "x-tenant-id": subDomain,
        },
      })
    );
  }, [OpenCreateRole]);
  // handlers
  // const handleAddRole = async (payload: any) => {
  //   const subDomain = new URL(window.location.href).hostname.split(".")[0];
  //   await dispatch(
  //     addRole({
  //       role: roleType,
  //       payload,
  //       headers: { "x-tenant-id": subDomain },
  //     })
  //   )
  //     .unwrap()
  //     .then(() => {
  //       resetRole();
  //     })
  //     .catch(() => {});
  //   // refresh roles
  //   dispatch(
  //     getRoles({
  //       role: roleType,
  //       headers: { "x-tenant-id": subDomain },
  //     })
  //   );
  // };

  // const handleAddPermission = async (payload: any) => {
  //   const subDomain = new URL(window.location.href).hostname.split(".")[0];
  //   await dispatch(
  //     addPermssion({
  //       role: roleType,
  //       payload,
  //       headers: { "x-tenant-id": subDomain },
  //     })
  //   )
  //     .unwrap()
  //     .then(() => {
  //       resetPermission();
  //     })
  //     .catch(() => {});
  //   // refresh permissions
  //   dispatch(
  //     getPermssion({
  //       role: roleType,
  //       headers: { "x-tenant-id": subDomain },
  //     })
  //   );
  // };

  // const handleAssignPermissions = async (payload: any) => {
  //   const subDomain = new URL(window.location.href).hostname.split(".")[0];

  //   await dispatch(
  //     addPermissonRole({
  //       role: roleType,
  //       payload,
  //       headers: { "x-tenant-id": subDomain },
  //     })
  //   )
  //     .unwrap()
  //     .then(() => {
  //       resetAssign();
  //     })
  //     .catch(() => {});
  // };

  // const submitRole = (data: any) => {
  //   const payload = {
  //     organization_id: data.organization_id || 1,
  //     name: data.name,
  //     description: data.description || "",
  //   };
  //   handleAddRole(payload);
  // };

  // const submitPermission = (data: any) => {
  //   const payload = {
  //     organization_id: data.organization_id || 1,
  //     name: data.name,
  //     description: data.description || "",
  //   };
  //   handleAddPermission(payload);
  // };

  // const submitAssign = (data: any) => {
  //   if (!data.role) {
  //     error_toast("Select a role");
  //     return;
  //   }
  //   const role_id = data.role.value;
  //   const permission_id = (data.permission_ids || []).map((p: any) => p.value);
  //   const payload = {
  //     role_id,
  //     organization_id: data.organization_id || 1,
  //     permission_id,
  //   };
  //   handleAssignPermissions(payload);
  // };

  return (
    <div className="">
      <div className="mx-auto">
        <div className="bg-white shadow p-4 rounded-lg">
          <RoleComponent
            roles={allRoles}
            permissionsRoles={permissionsRoles}
            allpermissionsroles={allpermissionsroles}
            allPermissions={allPermissions}
            handleModalOpen={handleModalOpen}
            handleModalClose={handleModalClose}
            EditRole={EditRole}
            CurrData={CurrData}
            OpenCreateRole={OpenCreateRole}
            setOpenCreateRole={setOpenCreateRole}
          />
        </div>
      </div>
    </div>
  );
}
