import React from "react";
import Loader from "../../../components/loader/Loader";
import { TableV2 } from "@eiris/common-ui-react";
import EditIcn from "../../../assets/svgs/EditIcn";
import EyeIcn from "../../../assets/svgs/EyeIcn";

interface userProps {
  loading: boolean;
  userData: any;
}

export default function UserComponent({ loading, userData }: userProps) {
  const formattedTenants = userData.map((e) => ({
    username: e.name,
    status: e.status,
    email: e.email,
    phonenumber: e.phonenumber,
  }));

  const menuItems = [
    {
      label: "View",
      icon: <EyeIcn className="" color="#000" />,
      onClick: (row: any) => {},
    },
    {
      label: "Edit",
      color: "blue",
      icon: <EditIcn color="#228be6" />,
      onClick: (row: any) => {},
    },
  ];
  const statusColorMap = {
    active: "green",
    inactive: "red",
  };

  return (
    <div>
      {loading && <Loader />}
      {userData?.length > 0 && (
        <TableV2
          data={formattedTenants}
          menuItems={menuItems}
          statusColorMap={statusColorMap}
          defaultSort={{ key: "name", direction: "asc" }}
        />
      )}
    </div>
  );
}
