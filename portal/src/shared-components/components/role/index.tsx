import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { error_toast } from "../../../utils/toaster";
import { Dialog, Modal, TableV2 } from "@eiris/common-ui-react";
import EditIcn from "../../../assets/svgs/EditIcn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { addPermissonRole, addRole } from "../../../store/reducers/tenantSlice";

export default function RoleComponent({
  roles = [],
  permissionsRoles = [],
  allPermissions = [],
  allpermissionsroles = [],
  handleModalOpen,
  handleModalClose,
  EditRole,
  CurrData = {},
  setOpenCreateRole,
  OpenCreateRole,
}: any) {
  const { roleType } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

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
  const subDomain = new URL(window.location.href).hostname.split(".")[0];

  const [form, setForm] = useState({
    name: "",
    description: "",
    organization_id: 1,
  });

  const selectedPermissionIds = (permissionsRoles || []).map(
    (item) => item.Permission?.id
  );

  const permissionOptions = (allPermissions || []).map((p: any) => ({
    value: p.id,
    label: p.name,
  }));
  const preSelectedOptions = permissionOptions.filter((opt) =>
    selectedPermissionIds.includes(opt.value)
  );

  useEffect(() => {
    setValue("permission_ids", preSelectedOptions);
  }, [permissionsRoles, allPermissions]);

  // const formattedRoles = roles?.map((e) => ({
  //   id: e?.id,
  //   role: e.name,
  //   description: e.description,
  // }));
  const permissionMap = Object.fromEntries(
    allpermissionsroles.map((r) => [
      r.role_id,
      r.permissions.map((p) => p.name).join(", "),
    ])
  );

  const formattedRoles = roles?.map((role) => ({
    id: role.id,
    role: role.name,
    description: role.description,
    permissions: permissionMap[role.id] || "None",
  }));

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
  const submitAssign = async (data: any) => {
    const subDomain = new URL(window.location.href).hostname.split(".")[0];
    const payload = {
      role_id: CurrData?.id,
      organization_id: CurrData.organization_id || 1,
      permission_id: (data.permission_ids || []).map((p: any) => p.value),
    };

    await dispatch(
      addPermissonRole({
        role: roleType,
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
  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      name: form.name || "-",
      description: form.description || "-",
      organization_id: 1,
    };

    await dispatch(
      addRole({
        role: roleType,
        payload,
        headers: { "x-tenant-id": subDomain },
      })
    )
      .unwrap()
      .then(() => {
        setForm({
          name: "",
          description: "",
          organization_id: 1,
        });
        setOpenCreateRole(false);
      })
      .catch(() => {});
  };
  console.log(permissionsRoles, "permissionsRoles");
  return (
    <div>
      <>
        <div className="flex flex-col">
          <div className="mb-8">
            <button
              onClick={() => {
                setOpenCreateRole(true);
              }}
              type="submit"
              className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg font-medium text-white text-sm transition-all duration-200 cursor-pointer"
            >
              Create New Role
            </button>
          </div>
        </div>
      </>
      <>
        <TableV2
          data={formattedRoles}
          menuItems={menuItems}
          statusColorMap={statusColorMap}
          defaultSort={{ key: "name", direction: "asc" }}
        />
      </>
      {EditRole?.open && Object.values(CurrData)?.length > 0 && (
        <Modal
          opened={EditRole?.open}
          onClose={() => {
            handleModalClose();
          }}
          size="xl"
        >
          <div className="min-h-[500px]">
            <form
              onSubmit={handleSubmitAssign(submitAssign)}
              className="gap-4 grid"
            >
              <div className="gap-4 grid grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-sm">Role</label>
                  {CurrData?.name}
                </div>

                {/* <div>
                  <label className="block mb-1 font-medium text-sm">
                    Organization ID
                  </label>
                  {CurrData?.organization_id}
                </div> */}
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm">
                  Select Permissions
                </label>

                <Controller
                  name="permission_ids"
                  control={controlAssign}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={permissionOptions}
                      onChange={(val) => field.onChange(val)}
                      placeholder="Select permissions..."
                    />
                  )}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-green-600 px-4 py-2 rounded text-white"
                >
                  Save Assignments
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      {OpenCreateRole && (
        <Dialog
          title="Create Role"
          opened={OpenCreateRole}
          onClose={() => {
            setOpenCreateRole(false);
          }}
        >
          <div className="p-[1.25rem]">
            <form className="gap-4 grid" onSubmit={handleSubmit}>
              <div className="gap-1 grid">
                <label className="font-medium text-sm">Role Name</label>
                <input
                  className="px-3 py-2 border rounded"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Enter role name"
                />
              </div>

              <div className="gap-1 grid">
                <label className="font-medium text-sm">Description</label>
                <input
                  className="px-3 py-2 border rounded"
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  placeholder="Enter description"
                />
              </div>

              {/* <div className="gap-1 grid">
                <label className="font-medium text-sm">Organization ID</label>
                <input
                  className="px-3 py-2 border rounded"
                  name="organization_id"
                  value={form.organization_id}
                  onChange={onChange}
                  placeholder="Enter organization ID"
                />
              </div> */}

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-bsecondary hover:opacity-80 px-5 py-2 rounded text-white"
                >
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  );
}
