import React, { useState } from "react";

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
import { DownloadIcn } from "../../../assets/svgs";
import { exportToCSV } from "../../../utils/exports";
import { USersFile } from "../../../assets/img";

interface userProps {
  loading: boolean;
  userData: any;
  FormStatus: any;
  CurrData: any;
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
  CurrData,
  FormStatus,
  setFormStatus,
  handleViewUser,
  handleEditUser,
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
}: any) {
  const navigate: any = useNavigate();
  const [ErrorAlert, setErrorAlert] = useState("");

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
                <div className="flex gap-2">
                  <Tooltip label="Download Sample File">
                    <a
                      href={USersFile}
                      className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
                    >
                      <DownloadIcn />
                      {/* <span>Download Sample File</span> */}
                    </a>
                  </Tooltip>
                  <button
                    onClick={() => {
                      setOpenForm(true);
                      // exportToCSV(formattedTenants, "hellow");
                    }}
                    className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
                  >
                    Bulk upload
                  </button>
                  {!allDetails?.is_single_org && (
                    <button
                      onClick={() => {
                        navigate("/createUser");
                      }}
                      type="submit"
                      className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
                    >
                      Create New User
                    </button>
                  )}
                </div>
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
              />
            </div>
          )}
        </>
      )}
      {FormStatus.mode && FormStatus.userId && CurrData && (
        <>
          <CreateUserContainer
            allUsersRoles={allUsersRoles}
            setFormStatus={setFormStatus}
            FormStatus={FormStatus}
            CurrData={CurrData}
            setdisplayAlert={setdisplayAlert}
          />
        </>
      )}
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
