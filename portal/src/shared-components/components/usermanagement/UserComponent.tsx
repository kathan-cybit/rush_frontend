import React from "react";

import { Loader, TableV2 } from "../../ui";
import { CreateUserContainer } from "../../containers";
import { useNavigate } from "react-router-dom";

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
  formattedTenants,
  statusColorMap,
  menuItems,
}: any) {
  const navigate: any = useNavigate();

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
              <div className="mb-8">
                <button
                  onClick={() => {
                    navigate("/createUser");
                  }}
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
                defaultSort={{ key: "first_name", direction: "asc" }}
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
