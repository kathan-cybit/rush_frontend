"use client"

import React from "react"
import { Tooltip as MantineTooltip, ThemeIcon as MantineThemeIcon } from "@mantine/core"
import type { TooltipProps, ThemeIconProps } from "@mantine/core"

interface TooltipWrapperProps extends TooltipProps {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

interface ThemeIconWrapperProps extends ThemeIconProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Tooltip({ children, onClick, ...props }: TooltipWrapperProps) {
  return (
    <MantineTooltip onClick={onClick} {...props}>
      {children}
    </MantineTooltip>
  )
}

export function ThemeIcon({ children, onClick, ...props }: ThemeIconWrapperProps) {
  return (
    <MantineThemeIcon onClick={onClick} {...props}>
      {children}
    </MantineThemeIcon>
  )
}
