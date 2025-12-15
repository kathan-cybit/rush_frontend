import React from "react";
import { Footer as ErisFooter } from "../../shared-components/ui";

export default function CustomFooter() {
  return (
    <>
      {" "}
      <ErisFooter
        version={process.env.VERSION}
        build_number={process.env.BUILD_NUMBER}
      />
    </>
  );
}
