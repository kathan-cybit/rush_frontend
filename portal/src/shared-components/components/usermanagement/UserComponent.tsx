import React, { useEffect, useState } from "react";

import {
  Alert,
  CustomBreadCrumbs,
  Dialog,
  Loader,
  Modal,
  TableV2,
  Tooltip,
  MultiSelect,
} from "../../ui";
import { UploadExcelForm } from "../index";
import Select from "react-select";
import ConfirmDeleteModal from "../confirmDeleteModal/confirmDeleteModal";

interface userProps {
  loading: boolean;
  userData: any;
  FormStatus: any;
  handleViewUser: (row: any) => void;
  handleEditUser: (row: any) => void;
  setFormStatus: any;
}

export default function UserComponent({
  tooltipObj,
  allUsersRoles,
  loading,
  loading2,
  allDetails,
  userData,
  FormStatus,
  formattedTenants,
  statusColorMap,
  menuItems,
  user,
  host,
  OpenForm,
  setOpenForm,
  BreadCrumbItems,
  setdisplayAlert,
  displayAlert,
  selectedAction,
  setErrorAlert,
  handleActionChange,
  actionOptions,
  ErrorAlert,
  tenantType,
  modalClose,
  deleteEntry,
  ConfirmDelete,
  navigateFunction,
}: any) {
  return (
    <div>
      {(loading || loading2) && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      {!FormStatus.mode && (
        <>
          {userData?.length > 0 && (
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
                    {!allDetails?.is_single_org && (
                      <button
                        onClick={() => {
                          navigateFunction("/createuser");
                        }}
                        type="submit"
                        className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
                      >
                        Create New User
                      </button>
                    )}
                  </div>
                </>
              </div>
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
              </>
              <TableV2
                data={formattedTenants}
                menuItems={menuItems}
                statusColorMap={statusColorMap}
                tooltipObj={tooltipObj}
                customTooltip={true}
              />
            </div>
          )}
        </>
      )}

      {OpenForm && (
        <Dialog
          title="Create Users"
          opened={OpenForm}
          onClose={() => setOpenForm(false)}
        >
          <UploadExcelForm
            uploader="user"
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
