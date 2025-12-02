"use client"

import React from "react"
import { Divider as MantineDivider } from "@mantine/core"
import type { DividerProps } from "@mantine/core"

interface SeparatorWrapperProps extends DividerProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Separator({ children, onClick, ...props }: SeparatorWrapperProps) {
  return (
    <MantineDivider onClick={onClick} {...props}>
      {children}
    </MantineDivider>
  )
}
