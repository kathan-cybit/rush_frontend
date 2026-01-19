import React from "react";
import { CreateUserContainer } from "../../../shared-components/containers";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const navigate = useNavigate();
  const navigateFunction = (url: string) => {
    navigate(url);
  };

  return (
    <div>
      <CreateUserContainer navigateFunction={navigateFunction} />
    </div>
  );
}
