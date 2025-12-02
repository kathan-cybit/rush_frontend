"use client"

import React from "react"
import { Group, UnstyledButton, Popover, Stack } from "@mantine/core"
import type { UnstyledButtonProps } from "@mantine/core"

interface NavigationMenuProps {
  children: React.ReactNode
  className?: string
}

export function NavigationMenu({ children, className }: NavigationMenuProps) {
  return (
    <nav className={className}>
      <Group gap="sm">{children}</Group>
    </nav>
  )
}

export function NavigationMenuList({ children }: { children: React.ReactNode }) {
  return <Group gap="sm">{children}</Group>
}

interface NavigationMenuItemProps {
  children: React.ReactNode
  className?: string
}

export function NavigationMenuItem({ children, className }: NavigationMenuItemProps) {
  return <div className={className}>{children}</div>
}

interface NavigationMenuTriggerProps extends UnstyledButtonProps {
  children: React.ReactNode
}

export function NavigationMenuTrigger({ children, ...props }: NavigationMenuTriggerProps) {
  return (
    <Popover.Target>
      <UnstyledButton
        {...props}
        style={{
          padding: "8px 16px",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: 500,
          transition: "background-color 150ms ease",
          ...props.style,
        }}
      >
        {children}
      </UnstyledButton>
    </Popover.Target>
  )
}

interface NavigationMenuContentProps {
  children: React.ReactNode
  className?: string
}

export function NavigationMenuContent({ children, className }: NavigationMenuContentProps) {
  return (
    <Popover.Dropdown className={className} p="md">
      <Stack gap="xs">{children}</Stack>
    </Popover.Dropdown>
  )
}

interface NavigationMenuLinkProps extends UnstyledButtonProps {
  children: React.ReactNode
  href?: string
}

export function NavigationMenuLink({ children, href,  style, ...props }: NavigationMenuLinkProps) {
  const Component = href ? "a" : UnstyledButton;

  const mergedStyle: React.CSSProperties = {
    display: "block",
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "14px",
    textDecoration: "none",
    transition: "background-color 150ms ease",
    ...(style as React.CSSProperties), // ✅ force-cast user style to valid inline style
  };

  return (
    <Component
      {...(href ? { href } : {})}
      {...props}
      style={mergedStyle}
    >
      {children}
    </Component>
  )
}

export function NavigationMenuIndicator() {
  return null
}

export function NavigationMenuViewport() {
  return null
}
