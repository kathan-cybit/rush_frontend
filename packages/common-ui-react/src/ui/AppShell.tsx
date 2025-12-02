import React from "react";
import {
  AppShell as MantineAppShell,
  AppShellHeader as MantineAppShellHeader,
  AppShellMain as MantineAppShellMain,
  AppShellNavbar as MantineAppShellNavbar,
  AppShellFooter as MantineAppShellFooter,
  AppShellSection as MantineAppShellSection,
  type AppShellProps,
} from "@mantine/core";

interface AppShellWrapperProps extends AppShellProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export function AppShell({ children, onClick, ...props }: AppShellWrapperProps) {
  console.log("AppShell rendered", MantineAppShell);
  return (
    <MantineAppShell onClick={onClick} {...props}>
      {children}
    </MantineAppShell>
  );
}

// ✅ Correct re-exports
export const AppShellHeader = MantineAppShellHeader;
export const AppShellMain = MantineAppShellMain;
export const AppShellNavbar = MantineAppShellNavbar;
export const AppShellFooter = MantineAppShellFooter;
export const AppShellSection = MantineAppShellSection;
