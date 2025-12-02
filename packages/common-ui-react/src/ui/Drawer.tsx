"use client";

import React from "react";
import {
  Drawer as MantineDrawer,
  DrawerRoot as MantineDrawerRoot,
  DrawerOverlay as MantineDrawerOverlay,
  DrawerContent as MantineDrawerContent,
  DrawerHeader as MantineDrawerHeader,
  DrawerTitle as MantineDrawerTitle,
  DrawerCloseButton as MantineDrawerCloseButton,
  DrawerBody as MantineDrawerBody,
  type DrawerProps,
} from "@mantine/core";

interface DrawerWrapperProps extends DrawerProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Drawer({ children, onClick, ...props }: DrawerWrapperProps) {
  return (
    <MantineDrawer onClick={onClick} {...props}>
      {children}
    </MantineDrawer>
  );
}

// ✅ Re-export Mantine subcomponents safely
export const DrawerRoot = MantineDrawerRoot;
export const DrawerOverlay = MantineDrawerOverlay;
export const DrawerContent = MantineDrawerContent;
export const DrawerHeader = MantineDrawerHeader;
export const DrawerTitle = MantineDrawerTitle;
export const DrawerCloseButton = MantineDrawerCloseButton;
export const DrawerBody = MantineDrawerBody;
