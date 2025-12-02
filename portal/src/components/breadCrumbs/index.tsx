import React from "react";
import { Breadcrumbs, Anchor } from "@mantine/core";

function CustomBreadCrumbs({ items, className, ...props }) {
  return (
    <Breadcrumbs
      separator=">"
      className={className}
      styles={{
        separator: {
          marginLeft: 6,
          marginRight: 6,
          color: "#adadad",
        },
      }}
      {...props}
    >
      {items.map((item: any, index: any) => (
        <Anchor
          styles={{
            root: {
              color: "#adadad",
              fontFamily: "var(--font-secondary)",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "140%",
              letterSpacing: "0.25px",
            },
          }}
          onClick={item?.onClick}
          underline="never"
          href={item.href}
          key={index}
        >
          {item.title}
        </Anchor>
      ))}
    </Breadcrumbs>
  );
}

export { CustomBreadCrumbs };
