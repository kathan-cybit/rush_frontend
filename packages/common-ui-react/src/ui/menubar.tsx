"use client"

import React from "react"

import { Menu as MantineMenu, Group, UnstyledButton } from "@mantine/core"
import { MenuProps, UnstyledButtonProps } from "@mantine/core"

interface MenubarProps {
  children: React.ReactNode
  className?: string
}

export function Menubar({ children, className }: MenubarProps) {
  return (
    <Group gap={0} className={className}>
      {children}
    </Group>
  )
}

interface MenubarMenuProps extends MenuProps {
  children: React.ReactNode
}

export function MenubarMenu({ children, ...props }: MenubarMenuProps) {
  return <MantineMenu {...props}>{children}</MantineMenu>
}

interface MenubarTriggerProps extends UnstyledButtonProps {
  children: React.ReactNode
}

export function MenubarTrigger({ children, ...props }: MenubarTriggerProps) {
  return (
    <MantineMenu.Target>
      <UnstyledButton
        {...props}
        style={{
          padding: "8px 12px",
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: 500,
          ...props.style,
        }}
      >
        {children}
      </UnstyledButton>
    </MantineMenu.Target>
  )
}

export function MenubarContent({ children, ...props }: { children: React.ReactNode }) {
  return <MantineMenu.Dropdown {...props}>{children}</MantineMenu.Dropdown>
}

export function MenubarItem(props: any) {
  return <MantineMenu.Item {...props} />
}

export function MenubarSeparator() {
  return <MantineMenu.Divider />
}

export function MenubarLabel(props: any) {
  return <MantineMenu.Label {...props} />
}

export function MenubarCheckboxItem(props: any) {
  return <MantineMenu.Item {...props} />
}

export function MenubarRadioGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function MenubarRadioItem(props: any) {
  return <MantineMenu.Item {...props} />
}

export function MenubarSub(props: MenuProps) {
  return <MantineMenu {...props} />
}

export function MenubarSubTrigger(props: any) {
  return <MantineMenu.Item {...props} />
}

export function MenubarSubContent({ children }: { children: React.ReactNode }) {
  return <MantineMenu.Dropdown>{children}</MantineMenu.Dropdown>
}

export function MenubarShortcut({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={className} style={{ marginLeft: "auto", fontSize: "0.75rem", opacity: 0.6 }}>
      {children}
    </span>
  )
}
