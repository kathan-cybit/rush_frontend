"use client"

import React from "react"
import { Badge as MantineBadge } from "@mantine/core"
import type { BadgeProps } from "@mantine/core"

interface BadgeWrapperProps extends BadgeProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Badge({ children, onClick, ...props }: BadgeWrapperProps) {
  return (
    <MantineBadge onClick={onClick} {...props}>
      {children}
    </MantineBadge>
  )
}
