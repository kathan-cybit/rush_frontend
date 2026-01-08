import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import {
  Alert,
  CustomBreadCrumbs,
  Dialog,
  Loader,
  Modal,
  TableV2,
  Tooltip,
} from "../../ui";
import { DownloadIcn } from "../../../assets/svgs";
import { exportToCSV } from "../../../utils/exports";
import { RolesFile } from "../../../assets/img";
import { UploadExcelForm } from "../index";

const SELECT_ALL_OPTION = {
  label: "Select All",
  value: "__select_all__",
};

const DESELECT_ALL_OPTION = {
  label: "",
  value: "",
};

export default function RoleComponent({
  allRoles,
  BreadCrumbItems,
  handleModalClose,
  EditRole,
  CurrData = {},
  setOpenCreateRole,
  OpenCreateRole,
  controlAssign,
  handleSubmitAssign,
  Roleform,
  setRoleForm,
  submitAssign,
  handleSubmit,
  onChangeRoleForm,
  permissionOptions,
  formattedRoles,
  menuItems,
  statusColorMap,
  isLoading,
  user,
  OpenForm,
  setOpenForm,
  host,
  displayAlert,
  setdisplayAlert,
  allDetails,
  actionOptions,
  handleActionChange,
  selectedAction,
}: any) {
  const [ErrorAlert, setErrorAlert] = useState("");
  const allSelected =
    Roleform.permissions?.length == permissionOptions.length &&
    permissionOptions.length > 0;

  const selectOptions = [
    allSelected ? DESELECT_ALL_OPTION : SELECT_ALL_OPTION,
    ...permissionOptions,
  ];

  return (
    <div>
      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <>
        <div className="flex flex-col">
          <div className="flex justify-between mb-8">
            <div>
              {/* <h1 className="mb-0 font-fsecondary text-[32px] text-[500] leading-[140%] tracking-[0.25px]">
                {"Hi," +
                  " " +
                  (user?.first_name || user?.username || "") +
                  " " +
                  (user?.last_name || "")}
              </h1> */}
              <>
                <CustomBreadCrumbs
                  separator=">"
                  items={BreadCrumbItems}
                  className="font-[500] font-fsecondary text-[#adadad] text-[14px] leading-[140%] tracking-[0.25px]"
                />
              </>
            </div>
            {/* {host != "public" && ( */}
            <>
              <div className="flex gap-2">
                {!allDetails?.is_single_org && (
                  <div className="w-[125px]">
                    <Select
                      value={selectedAction}
                      onChange={handleActionChange}
                      options={actionOptions}
                      placeholder="Actions"
                      isClearable={false}
                      isSearchable={false}
                      menuPlacement="auto"
                      classNamePrefix="action-dropdown"
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          minHeight: "45px",
                          borderRadius: "0.5rem",
                          border: "none",
                          boxShadow: "none",
                          backgroundColor: "#14258f",
                          paddingLeft: "12px",
                          paddingRight: "12px",
                          cursor: "pointer",
                          ":hover": {
                            opacity: 0.85,
                          },
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "white",
                          fontWeight: 500,
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: "white",
                          fontWeight: 500,
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "white",
                          ":hover": {
                            color: "white",
                          },
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        menu: (base) => ({
                          ...base,
                          borderRadius: "0.5rem",
                          marginTop: "6px",
                          overflow: "hidden",
                          zIndex: 50,
                        }),
                        option: (base, state) => ({
                          ...base,
                          cursor: "pointer",
                          backgroundColor: state.isFocused
                            ? "#14258f"
                            : "white",
                          color: !state.isFocused ? "#111827" : "#fff",
                          ":active": {
                            backgroundColor: "#14258fa6",
                          },
                        }),
                      }}
                    />
                  </div>
                )}
                {(!allDetails?.is_single_org || host == "public") && (
                  <button
                    onClick={() => {
                      setOpenCreateRole(true);
                    }}
                    type="submit"
                    className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
                  >
                    Create New Role
                  </button>
                )}
              </div>{" "}
            </>
            {/* )} */}
          </div>
        </div>
      </>
      <>
        {displayAlert && (
          <Alert
            withCloseButton
            onClick={() => {
              setdisplayAlert(false);
            }}
          >
            {ErrorAlert}
          </Alert>
        )}
        <TableV2
          data={formattedRoles}
          menuItems={menuItems}
          statusColorMap={statusColorMap}
        />
      </>
      {EditRole?.open && Object.values(CurrData)?.length > 0 && (
        <Dialog
          title="Update Role"
          opened={EditRole?.open}
          onClose={() => {
            handleModalClose();
          }}
        >
          <div className="p-[1.25rem] min-h-[700px]">
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
                    // <Select
                    //   {...field}
                    //   isMulti
                    //   options={permissionOptions}
                    //   onChange={(val) => field.onChange(val)}
                    //   placeholder="Select permissions..."
                    // />
                    <Select
                      isMulti
                      options={selectOptions}
                      placeholder="Select permissions..."
                      value={field.value}
                      onChange={(selected: any) => {
                        if (!selected) {
                          field.onChange([]);
                          return;
                        }

                        // Select All clicked
                        if (
                          selected.some(
                            (opt: any) => opt.value === "__select_all__"
                          )
                        ) {
                          field.onChange(permissionOptions);
                          return;
                        }

                        // Normal selection
                        field.onChange(selected);
                      }}
                    />
                  )}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
                >
                  Save Assignments
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      )}
      {OpenCreateRole && (
        <Dialog
          title="Create Role"
          opened={OpenCreateRole}
          onClose={() => setOpenCreateRole(false)}
        >
          <div className="p-[1.25rem] min-h-[700px]">
            <form className="gap-4 grid" onSubmit={handleSubmit}>
              <div className="gap-1 grid">
                <label className="font-medium text-sm">
                  Role Name <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  autoComplete="off"
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
                  autoComplete="off"
                  className="px-3 py-2 border rounded"
                  name="description"
                  value={Roleform.description}
                  onChange={onChangeRoleForm}
                  placeholder="Enter description"
                />
              </div>

              <div className="gap-1 grid">
                <label className="font-medium text-sm">
                  Select Permissions
                </label>

                <Select
                  isMulti
                  options={selectOptions}
                  value={Roleform.permissions}
                  placeholder="Select permissions..."
                  onChange={(selected: any) => {
                    if (!selected) {
                      setRoleForm({ ...Roleform, permissions: [] });
                      return;
                    }

                    // Select All clicked
                    if (
                      selected.some(
                        (opt: any) => opt.value === "__select_all__"
                      )
                    ) {
                      setRoleForm({
                        ...Roleform,
                        permissions: permissionOptions,
                      });
                      return;
                    }

                    // Normal selection
                    setRoleForm({
                      ...Roleform,
                      permissions: selected,
                    });
                  }}
                />
              </div>

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
      {OpenForm && (
        <Dialog
          title="Create Roles"
          // size={"xl"}
          opened={OpenForm}
          onClose={() => setOpenForm(false)}
        >
          <UploadExcelForm
            uploader="role"
            host={host}
            setOpenForm={setOpenForm}
            setdisplayAlert={setdisplayAlert}
            setErrorAlert={setErrorAlert}
          />
        </Dialog>
      )}
    </div>
  );
}
// <div className="flex gap-2">
//   {(!allDetails?.is_single_org || host == "public") && (
//     <Tooltip label="Download Sample File">
//       <a
//         href={RolesFile}
//         className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
//       >
//         <DownloadIcn />
//       </a>
//     </Tooltip>
//   )}
//   {(!allDetails?.is_single_org || host == "public") && (
//     <button
//       onClick={() => {
//         setOpenForm(true);
//       }}
//       type="submit"
//       className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
//     >
//       Bulk upload
//     </button>
//   )}
//   {(!allDetails?.is_single_org || host == "public") && (
//     <button
//       onClick={() => {
//         setOpenCreateRole(true);
//       }}
//       type="submit"
//       className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
//     >
//       Create New Role
//     </button>
//   )}
// </div>
