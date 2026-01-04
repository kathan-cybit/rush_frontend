import React, { useEffect, useState } from "react";

import {
  Alert,
  CustomBreadCrumbs,
  Dialog,
  Loader,
  Modal,
  TableV2,
  Tooltip,
} from "../../ui";
import { CreateUserContainer } from "../../containers";
import { useNavigate } from "react-router-dom";
import { UploadExcelForm } from "../index";
import { DownloadIcn, Dropdown } from "../../../assets/svgs";
import { exportToCSV } from "../../../utils/exports";
import Select from "react-select";

interface userProps {
  loading: boolean;
  userData: any;
  FormStatus: any;
  handleViewUser: (row: any) => void;
  handleEditUser: (row: any) => void;
  setFormStatus: any;
}

export default function UserComponent({
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
                {!allDetails?.is_single_org && (
                  <div className="w-[220px]">
                    <Select
                      value={selectedAction}
                      onChange={handleActionChange}
                      options={actionOptions}
                      placeholder="Select option"
                      isClearable={false}
                      isSearchable={false}
                      menuPlacement="auto"
                      styles={{
                        control: (base) => ({
                          ...base,
                          minHeight: "45px",
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                        }),
                        option: (base) => ({
                          ...base,
                          cursor: "pointer",
                        }),
                      }}
                    />
                  </div>
                )}
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
                customTooltip={{ isVerified: "Click to verify" }}
              />
            </div>
          )}
        </>
      )}
      {/* {FormStatus.mode && FormStatus.userId && CurrData && (
        <>
          <CreateUserContainer
            allUsersRoles={allUsersRoles}
            setFormStatus={setFormStatus}
            FormStatus={FormStatus}
            CurrData={CurrData}
            setdisplayAlert={setdisplayAlert}
          />
        </>
      )} */}
      {OpenForm && (
        <Dialog
          title="Create Users"
          // size={"xl"}
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
    </div>
  );
}
