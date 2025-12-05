import React from "react";
import Table from "react-bootstrap/Table";

interface LoginProps {
  users: any;
}

export default function LicenseComponent({ users }: LoginProps) {
  return (
    <div>
      <div className="bg-gray-50 min-h-screen">
        <Table
          striped
          bordered
          hover
          className="shadow-lg rounded-lg w-full overflow-hidden text-left"
        >
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
            </tr>
          </thead>

          <tbody>
            {users?.length > 0 &&
              users?.map((user: any, index: any) => (
                <tr key={user.id} className="border-gray-200 border-b">
                  <td className="p-3 font-medium">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
