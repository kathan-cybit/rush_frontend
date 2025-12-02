import React from "react";
import Loader from "../../../components/loader/Loader";
import { TableV2 } from "@eiris/common-ui-react";
import EditIcn from "../../../assets/svgs/EditIcn";
import EyeIcn from "../../../assets/svgs/EyeIcn";
import { CreateUserContainer } from "../../containers";

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
  loading,
  userData,
  CurrData,
  FormStatus,
  setFormStatus,
  handleViewUser,
  handleEditUser,
}: userProps) {
  const formattedTenants = userData.map((e) => ({
    id: e?.id,
    username: e.name,
    status: e.status,
    email: e.email,
    phonenumber: e.phonenumber,
  }));

  const menuItems = [
    {
      label: "View",
      icon: <EyeIcn className="" color="#000" />,
      onClick: (row: any) => {
        handleViewUser(row);
      },
    },
    {
      label: "Edit",
      color: "blue",
      icon: <EditIcn color="#228be6" />,
      onClick: (row: any) => {
        handleEditUser(row);
      },
    },
  ];
  const statusColorMap = {
    active: "green",
    inactive: "red",
  };

  return (
    <div>
      {loading && <Loader />}
      {!FormStatus.mode && (
        <>
          {userData?.length > 0 && (
            <div className="flex flex-col">
              <div className="mb-8">
                <button
                  type="submit"
                  className="inline-flex float-end items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg font-medium text-white text-sm transition-all duration-200 cursor-pointer"
                >
                  Create New User
                </button>
              </div>
              <TableV2
                data={formattedTenants}
                menuItems={menuItems}
                statusColorMap={statusColorMap}
                defaultSort={{ key: "name", direction: "asc" }}
              />
            </div>
          )}
        </>
      )}
      {FormStatus.mode && FormStatus.userId && CurrData && (
        <>
          <CreateUserContainer
            setFormStatus={setFormStatus}
            FormStatus={FormStatus}
            CurrData={CurrData}
          />
        </>
      )}
    </div>
  );
}
