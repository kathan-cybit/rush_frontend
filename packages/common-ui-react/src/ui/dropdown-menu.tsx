"use client"

import React from "react"

import { Menu as MantineMenu, type MenuProps } from "@mantine/core"
import type { MenuTargetProps, MenuDropdownProps, MenuItemProps, MenuDividerProps, MenuLabelProps } from "@mantine/core"

export function DropdownMenu(props: MenuProps) {
  return <MantineMenu {...props} />
}

export function DropdownMenuTrigger({ children, ...props }: MenuTargetProps) {
  return <MantineMenu.Target {...props}>{children}</MantineMenu.Target>
}

export function DropdownMenuContent({ children, ...props }: MenuDropdownProps) {
  return <MantineMenu.Dropdown {...props}>{children}</MantineMenu.Dropdown>
}

export function DropdownMenuItem(props: MenuItemProps) {
  return <MantineMenu.Item {...props} />
}

export function DropdownMenuSeparator(props: MenuDividerProps) {
  return <MantineMenu.Divider {...props} />
}

export function DropdownMenuLabel(props: MenuLabelProps) {
  return <MantineMenu.Label {...props} />
}

export function DropdownMenuGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function DropdownMenuSub(props: MenuProps) {
  return <MantineMenu {...props} />
}

export function DropdownMenuSubTrigger({ children, ...props }: MenuItemProps) {
  return <MantineMenu.Item {...props}>{children}</MantineMenu.Item>
}

export function DropdownMenuSubContent({ children, ...props }: MenuDropdownProps) {
  return <MantineMenu.Dropdown {...props}>{children}</MantineMenu.Dropdown>
}

export function DropdownMenuCheckboxItem(props: MenuItemProps) {
  return <MantineMenu.Item {...props} />
}

export function DropdownMenuRadioItem(props: MenuItemProps) {
  return <MantineMenu.Item {...props} />
}

export function DropdownMenuRadioGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function DropdownMenuShortcut({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={className} style={{ marginLeft: "auto", fontSize: "0.75rem", opacity: 0.6 }}>
      {children}
    </span>
  )
}
