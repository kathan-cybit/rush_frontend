import React from "react";
import { Footer as ErisFooter } from "@eiris/common-ui-react";

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
