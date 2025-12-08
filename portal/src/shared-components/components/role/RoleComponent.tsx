import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { Dialog, Loader, Modal, TableV2 } from "../../ui";

export default function RoleComponent({
  handleModalClose,
  EditRole,
  CurrData = {},
  setOpenCreateRole,
  OpenCreateRole,
  controlAssign,
  handleSubmitAssign,
  Roleform,
  submitAssign,
  handleSubmit,
  onChangeRoleForm,
  permissionOptions,
  formattedRoles,
  menuItems,
  statusColorMap,
  isLoading,
}: any) {
  return (
    <div>
      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
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
                  value={Roleform.name}
                  onChange={onChangeRoleForm}
                  placeholder="Enter role name"
                />
              </div>

              <div className="gap-1 grid">
                <label className="font-medium text-sm">Description</label>
                <input
                  className="px-3 py-2 border rounded"
                  name="description"
                  value={Roleform.description}
                  onChange={onChangeRoleForm}
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
