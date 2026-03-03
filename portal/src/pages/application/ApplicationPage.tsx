import React from "react";
import { useNavigate } from "react-router-dom";
import ApplicationContainer from "../../shared-components/containers/application/ApplicationContainer";

export default function ApplicationPage() {
  const navigate = useNavigate();
  const navigateFunction = (url: string) => {
    navigate(url);
  };
  return (
    <div>
      <ApplicationContainer navigateFunction={navigateFunction} />
    </div>
  );
}
