import React from "react";

import { useNavigate } from "react-router-dom";
import { CreateTenantContainer } from "../../shared-components/containers";

export default function CreateTenant() {
  const navigate = useNavigate();
  const navigateFunction = (url: string) => {
    navigate(url);
  };

  return (
    <>
      <CreateTenantContainer navigateFunction={navigateFunction} />
    </>
  );
}
