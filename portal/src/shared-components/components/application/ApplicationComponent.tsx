import { TableV2, Dialog, CustomBreadCrumbs } from "../../ui";
import React from "react";
import ConfirmDeleteModal from "../confirmDeleteModal/confirmDeleteModal";

export default function ApplicationComponent({
  formattedRoles,
  statusColorMap,
  menuItems,
  deleteEntry,
  modaleleteClose,
  ConfirmDelete,
  tenantType,
  host,
  openCreateEditAppModal,
  setCreateEditAppModal,
  closeCreateEditModal,
  BreadCrumbItems,
  onSubmit,
  handleSubmit,
  errors,
  register,
}) {
  return (
    <div>
      <div className="flex justify-between mb-8">
        <div>
          <CustomBreadCrumbs
            separator=">"
            items={BreadCrumbItems}
            className="font-[500] font-fsecondary text-[#adadad] text-[14px] leading-[140%] tracking-[0.25px]"
          />
        </div>
        <div>
          <button
            onClick={() => {
              setCreateEditAppModal({
                ...openCreateEditAppModal,
                type: "create",
                mode: true,
              });
            }}
            type="submit"
            className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
          >
            Create New Application
          </button>
        </div>
      </div>
      <>
        <TableV2
          data={formattedRoles}
          menuItems={menuItems}
          statusColorMap={statusColorMap}
        />
      </>
      {ConfirmDelete?.mode && (
        <ConfirmDeleteModal
          ConfirmDelete={ConfirmDelete}
          modalClose={modaleleteClose}
          host={host}
          tenantType={tenantType}
          deleteEntry={deleteEntry}
        />
      )}
      {openCreateEditAppModal?.mode && openCreateEditAppModal?.type && (
        <Dialog
          title={
            openCreateEditAppModal.type === "edit"
              ? "Edit Application"
              : "Create Application"
          }
          opened={openCreateEditAppModal.mode}
          onClose={closeCreateEditModal}
        >
          <div className="p-[1.25rem] pb-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <label className="text-sm font-medium">
                  Application Name<span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  {...register("appname", {
                    required: "App name is required",
                  })}
                  placeholder="Enter application name"
                  className={`w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.appname ? "is-invalid" : ""
         }`}
                />
                {errors?.appname && (
                  <p className="text-red-500 text-xs">
                    {errors.appname.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">
                  Description<span className="ml-1 text-red-500">*</span>
                </label>
                <textarea
                  {...register("appDescription", {
                    required: "Description is required",
                  })}
                  placeholder="Enter description"
                  className={`w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.appDescription ? "is-invalid" : ""
         }`}
                />
                {errors?.appDescription && (
                  <p className="text-red-500 text-xs">
                    {errors.appDescription.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">
                  Application URL<span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  {...register("appUrl", {
                    required: "App URL is required",
                    pattern: {
                      value: /^(https?:\/\/)/,
                      message: "URL must start with http:// or https://",
                    },
                  })}
                  placeholder="https://tenant.eiris.com"
                  className={`w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.appUrl ? "is-invalid" : ""
         }`}
                />
                {errors?.appUrl && (
                  <p className="text-red-500 text-xs">
                    {errors.appUrl.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">
                  {" "}
                  Organisation ID<span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  {...register("organization_id", {
                    required: "Organisation ID is required",
                  })}
                  type="number"
                  placeholder="Organisation ID"
                  className={`w-full px-3 py-2 border border-[#ced4da] rounded-md 
         focus:border-[#86b7fe]  focus:outline-none focus:border-[2px] disabled:bg-[#ced4da] ${
           errors.organization_id ? "is-invalid" : ""
         }`}
                />
                {errors?.organization_id && (
                  <p className="text-red-500 text-xs">
                    {errors.organization_id.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-bsecondary text-white px-4 py-2 rounded"
                >
                  {openCreateEditAppModal.type === "edit" ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  );
}
