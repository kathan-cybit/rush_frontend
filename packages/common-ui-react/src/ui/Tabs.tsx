"use client";

import React from "react";
import {
  Tabs as MantineTabs,
  TabsList as MantineTabsList,
  TabsTab as MantineTabsTab,
  TabsPanel as MantineTabsPanel,
  type TabsProps,
} from "@mantine/core";

interface TabsWrapperProps extends TabsProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function Tabs({ children, onClick, ...props }: TabsWrapperProps) {
  return (
    <MantineTabs onClick={onClick} {...props}>
      {children}
    </MantineTabs>
  );
}

// ✅ Safe re-exports
export const TabsList = MantineTabsList;
export const TabsTab = MantineTabsTab;
export const TabsPanel = MantineTabsPanel;
