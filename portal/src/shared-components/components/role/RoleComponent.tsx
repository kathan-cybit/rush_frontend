import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

import {
  Alert,
  CustomBreadCrumbs,
  Dialog,
  Loader,
  TableV2,
  MultiSelect,
} from "../../ui";
import { UploadExcelForm } from "../index";
import ConfirmDeleteModal from "../confirmDeleteModal/confirmDeleteModal";

const SELECT_ALL_VALUE = "__select_all__";

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
  ConfirmDelete,
  tenantType,
  modalClose,
  deleteEntry,
}: any) {
  const [ErrorAlert, setErrorAlert] = useState("");

  // Check if all permissions are selected
  const allSelected =
    Roleform.permissions?.length === permissionOptions.length &&
    permissionOptions.length > 0;

  // Add "Select All" option to the beginning of the options array
  const selectOptions = [
    {
      value: SELECT_ALL_VALUE,
      label: allSelected ? "Deselect All" : "Select All",
    },
    ...permissionOptions,
  ];

  // Helper function to handle multi-select changes with "Select All" logic
  const handleMultiSelectChange = (
    selectedValues: string[],
    onChange: (value: any[]) => void,
  ) => {
    if (!selectedValues || selectedValues.length === 0) {
      onChange([]);
      return;
    }

    // Check if "Select All" was clicked
    if (selectedValues.includes(SELECT_ALL_VALUE)) {
      // If currently all selected, deselect all
      if (allSelected) {
        onChange([]);
      } else {
        // Otherwise, select all permissions (excluding the select all option)
        onChange(permissionOptions);
      }
      return;
    }

    // Normal selection - map values back to option objects
    const selected = permissionOptions.filter((opt: any) =>
      selectedValues.includes(opt.value),
    );
    onChange(selected);
  };

  // Helper function to get current values for Mantine MultiSelect
  const getCurrentValues = (permissions: any[]) => {
    return (permissions || []).map((p: any) => p.value);
  };

  return (
    <div>
      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
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
            <CustomBreadCrumbs
              separator=">"
              items={BreadCrumbItems}
              className="font-[500] font-fsecondary text-[#adadad] text-[14px] leading-[140%] tracking-[0.25px]"
            />
          </div>
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
                      backgroundColor: state.isFocused ? "#14258f" : "white",
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
          </div>
        </div>
      </div>
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
      {EditRole?.open && Object.values(CurrData)?.length > 0 && (
        <Dialog
          title="Update Role"
          opened={EditRole?.open}
          onClose={() => {
            handleModalClose();
          }}
        >
          <div className="p-[1.25rem] pb-4">
            <form
              onSubmit={handleSubmitAssign(submitAssign)}
              className="gap-4 grid"
            >
              <div className="gap-4 grid grid-cols-2">
                <div>
                  <label className="block mb-1 font-medium text-sm">Role</label>
                  {CurrData?.name}
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
                    <MultiSelect
                      data={selectOptions}
                      placeholder="Select permissions..."
                      value={getCurrentValues(field.value)}
                      onChange={(selectedValues) =>
                        handleMultiSelectChange(selectedValues, field.onChange)
                      }
                      searchable
                      clearable
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
          <div className="p-[1.25rem] pb-4">
            <form className="gap-4 grid" onSubmit={handleSubmit}>
              <div className="gap-1 grid">
                <label className="font-medium text-sm">
                  {" "}
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
                <label className="font-medium text-sm"> Description</label>
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
                  {" "}
                  Select Permissions
                </label>

                <MultiSelect
                  data={selectOptions}
                  value={getCurrentValues(Roleform.permissions)}
                  placeholder="Select permissions..."
                  onChange={(selectedValues) => {
                    handleMultiSelectChange(selectedValues, (selected) => {
                      setRoleForm({
                        ...Roleform,
                        permissions: selected,
                      });
                    });
                  }}
                  searchable
                  clearable
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
      {ConfirmDelete?.mode && (
        <ConfirmDeleteModal
          ConfirmDelete={ConfirmDelete}
          modalClose={modalClose}
          host={host}
          tenantType={tenantType}
          deleteEntry={deleteEntry}
        />
      )}
    </div>
  );
}
