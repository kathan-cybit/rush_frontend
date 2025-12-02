import React from "react"
import { rem, useMantineTheme } from "@mantine/core"
import {
  IconDashboard,
  IconSettings,
  IconFiles,
  IconUsers,
  IconChevronRight,
  IconChevronLeft,
  IconTool,
} from "@tabler/icons-react"
import { AppShellNavbar, AppShellSection } from "./AppShell"
import { Stack } from "./Layout"
import { Tooltip, ThemeIcon } from "./Tooltip"
import { UnstyledButton } from "./Button"
import { Text } from "./Typography"

interface NavbarLinkProps {
  icon: React.FC<any>
  label: string
  active?: boolean
  onClick?(): void
  collapsed: boolean
}

function NavbarLink({ icon: Icon, label, active, onClick, collapsed }: NavbarLinkProps) {
  const theme = useMantineTheme()

  const activeBg = "rgba(0, 0, 0, 0.06)"
  const hoverBg = "rgba(0, 0, 0, 0.06)"
  const textColor = theme.colors.gray[8]
  const activeBorderColor = theme.colors.blue[6]

  // Increased sizes
  const iconSize = 24
  const fontSize = rem(14)
  const buttonPaddingY = rem(14)
  const buttonPaddingX = rem(14)
  const themeIconSize = 34
  const themeIconMarginRight = rem(12)

  return (
    <Tooltip
      label={label}
      position="right"
      disabled={!collapsed}
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        onClick={onClick}
       style={{
          display: "flex",
          alignItems: "center",
          padding: `${buttonPaddingY} ${buttonPaddingX}`,
          width: "100%",
          backgroundColor: active ? activeBg : "transparent",
          color: textColor,
          fontWeight: active ? 600 : 500,
          fontSize: fontSize,
          borderLeft: active ? `4px solid ${activeBorderColor}` : "4px solid transparent",
          minHeight: rem(50),
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.backgroundColor = hoverBg
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.backgroundColor = "transparent"
          }
        }}
      >
        <ThemeIcon
          variant="transparent"
          size={themeIconSize}
          radius="sm"
          style={{ marginRight: collapsed ? 0 : themeIconMarginRight }}
        >
          <Icon size={iconSize} stroke={2} color="#2b2a29ff" />
        </ThemeIcon>
        {!collapsed && <Text style={{ fontSize, fontWeight: 500 }}>{label}</Text>}
      </UnstyledButton>
    </Tooltip>
  )
}

export interface NavItem {
  icon: React.FC<any>
  label: string
  key: string
}

export interface SidebarProps {
  collapsed: boolean
  toggleCollapsed: () => void
  activeNavItem?: string
  onNavigate?: (key: string) => void
  navItems: NavItem[]
}

export function Sidebar({
  collapsed,
  toggleCollapsed,
  activeNavItem,
  onNavigate,
  navItems,
}: SidebarProps) {
  const theme = useMantineTheme()

  // Increased sidebar width and toggle button/icon size
  const expandedWidth = rem(220)
  const collapsedWidth = rem(80)
  const toggleIconSize = 24
  const toggleButtonPadding = rem(10)

  return (
    <AppShellNavbar p={0} style={{ backgroundColor: "#f9f9f9", borderRight: '1px solid #e5e7eb', width: collapsed ? collapsedWidth : expandedWidth }}>
      <AppShellSection grow py="sm">
        <Stack gap={0}>
          {/* <div style={{ padding: rem(12), fontWeight: 600, fontSize: rem(14), color: theme.colors.gray[7] }}>
            E
          </div> */}
          {/* <div style={{ borderTop: `1px solid ${theme.colors.gray[3]}`, margin: `${rem(4)} 0` }} /> */}
          {navItems.map((item) => (
            <NavbarLink
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={activeNavItem === item.key}
              onClick={() => onNavigate?.(item.key)}
              collapsed={collapsed}
            />
          ))}
        </Stack>
      </AppShellSection>

      <AppShellSection py="xs" px="sm">
        <UnstyledButton
          onClick={toggleCollapsed}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-end",
            padding: toggleButtonPadding,
            color: theme.colors.gray[7],
            borderRadius: rem(6),
            minHeight: rem(48),
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.gray[1]
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
          }}
        >
          {collapsed ? (
            <IconChevronRight size={toggleIconSize} />
          ) : (
            <IconChevronLeft size={toggleIconSize} />
          )}
        </UnstyledButton>
      </AppShellSection>
    </AppShellNavbar>
  )
}
 