import React from "react";

import { DashboardContainer } from "../../shared-components/containers";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const navigateFunction = (url: string) => {
    navigate(url);
  };
  const navigateFunctionWithState = (url: string, obj: any) => {
    navigate(url, obj);
  };

  return (
    <>
      <DashboardContainer
        navigateFunctionWithState={navigateFunctionWithState}
        navigateFunction={navigateFunction}
      />
    </>
  );
}
