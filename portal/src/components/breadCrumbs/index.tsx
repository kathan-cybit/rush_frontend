import React from "react";
import { Breadcrumbs, Anchor } from "@mantine/core";

function CustomBreadCrumbs({
  items,
  className = "font-[500] font-fsecondary text-[#adadad] text-[14px] leading-[140%] tracking-[0.25px]",
  ...props
}) {
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
