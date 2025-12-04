import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { error_toast } from "../../../utils/toaster";
import { Modal, TableV2 } from "@eiris/common-ui-react";
import EditIcn from "../../../assets/svgs/EditIcn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { addPermissonRole } from "../../../store/reducers/tenantSlice";

export default function RoleComponent({
  roles = [],
  allPermissions = [],
  handleModalOpen,
  handleModalClose,
  EditRole,
  CurrData = {},
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

  const permissionOptions = (allPermissions || []).map((p: any) => ({
    value: p.id,
    label: p.name,
  }));

  const formattedRoles = roles?.map((e) => ({
    id: e?.id,
    role: e.name,
    description: e.description,
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
      organization_id: CurrData.organization_id,
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
      })
      .catch(() => {});
  };

  return (
    <div>
      <TableV2
        data={formattedRoles}
        menuItems={menuItems}
        statusColorMap={statusColorMap}
        defaultSort={{ key: "name", direction: "asc" }}
      />
      {EditRole?.open && Object.values(CurrData)?.length > 0 && (
        <Modal
          opened={true}
          onClose={() => {
            handleModalClose();
          }}
          size="xl"
          // onClick={() => console.log("content clicked")}
        >
          <form
            onSubmit={handleSubmitAssign(submitAssign)}
            className="gap-4 grid"
          >
            <div className="gap-4 grid grid-cols-2">
              <div>
                <label className="block mb-1 font-medium text-sm">Role</label>
                {CurrData?.name}
              </div>

              <div>
                <label className="block mb-1 font-medium text-sm">
                  Organization ID
                </label>
                {CurrData?.organization_id}
              </div>
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
        </Modal>
      )}
    </div>
  );
}
