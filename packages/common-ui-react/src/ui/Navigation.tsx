"use client";

import React from "react";
import {
  Burger as MantineBurger,
  Menu as MantineMenu,
  MenuTarget as MantineMenuTarget,
  MenuDropdown as MantineMenuDropdown,
  MenuItem as MantineMenuItem,
  MenuDivider as MantineMenuDivider,
  MenuLabel as MantineMenuLabel,
  type BurgerProps,
  type MenuProps,
} from "@mantine/core";

interface BurgerWrapperProps extends BurgerProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface MenuWrapperProps extends MenuProps {
  children?: React.ReactNode;
}

export function Burger({ children, onClick, ...props }: BurgerWrapperProps) {
  return (
    <MantineBurger onClick={onClick} {...props}>
      {children}
    </MantineBurger>
  );
}

export function Menu({ children, ...props }: MenuWrapperProps) {
  return <MantineMenu {...props}>{children}</MantineMenu>;
}

// ✅ Correct re-exports
export const MenuTarget = MantineMenuTarget;
export const MenuDropdown = MantineMenuDropdown;
export const MenuItem = MantineMenuItem;
export const MenuDivider = MantineMenuDivider;
export const MenuLabel = MantineMenuLabel;
