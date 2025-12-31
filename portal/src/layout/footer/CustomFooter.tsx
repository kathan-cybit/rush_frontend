import React from "react";
import { Footer as ErisFooter } from "../../shared-components/ui";

export default function CustomFooter() {
  return (
    <>
      {" "}
      <ErisFooter
        version={process.env.REACT_APP_VERSION}
        build_number={process.env.REACT_APP_BUILD_NUMBER}
      />
    </>
  );
}
