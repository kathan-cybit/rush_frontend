"use client";

import React from "react";
import {
  Popover as MantinePopover,
  PopoverTarget as MantinePopoverTarget,
  PopoverDropdown as MantinePopoverDropdown,
  type PopoverProps,
} from "@mantine/core";

interface PopoverWrapperProps extends PopoverProps {
  children?: React.ReactNode;
}

export function Popover({ children, ...props }: PopoverWrapperProps) {
  return <MantinePopover {...props}>{children}</MantinePopover>;
}

// ✅ Safe re-exports
export const PopoverTarget = MantinePopoverTarget;
export const PopoverDropdown = MantinePopoverDropdown;
