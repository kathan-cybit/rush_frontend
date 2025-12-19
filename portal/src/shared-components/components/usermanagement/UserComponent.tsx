import React, { useState } from "react";

import {
  Alert,
  CustomBreadCrumbs,
  Dialog,
  Loader,
  Modal,
  TableV2,
} from "../../ui";
import { CreateUserContainer } from "../../containers";
import { useNavigate } from "react-router-dom";
import UploadExcelForm from "./UploadExcelForm";

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
      {loading && (
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
                  <h1 className="mb-0 font-fsecondary text-[32px] text-[500] leading-[140%] tracking-[0.25px]">
                    {"Hi," + " " + user?.first_name + " " + user?.last_name}
                  </h1>
                  {/* <span className="font-fsecondary text-[#adadad] text-[14px] text-[500] leading-[140%]">
                    Continue to other apps
                  </span> */}
                  <>
                    <CustomBreadCrumbs
                      separator=">"
                      items={BreadCrumbItems}
                      className="font-[500] font-fsecondary text-[#adadad] text-[14px] leading-[140%] tracking-[0.25px]"
                    />
                  </>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setOpenForm(true);
                    }}
                    type="submit"
                    className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
                  >
                    Upload .XLS file
                  </button>
                  <button
                    onClick={() => {
                      navigate("/createUser");
                    }}
                    type="submit"
                    className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
                  >
                    Create New User
                  </button>
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
                defaultSort={{ key: "first_name", direction: "asc" }}
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
          />
        </>
      )}
      {OpenForm && (
        <Modal
          // title="Create Users"
          size={"xl"}
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
        </Modal>
      )}
    </div>
  );
}
