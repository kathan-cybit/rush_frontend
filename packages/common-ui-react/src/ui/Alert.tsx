"use client"

import React from "react"
import { Alert as MantineAlert } from "@mantine/core"
import type { AlertProps } from "@mantine/core"

interface AlertWrapperProps extends AlertProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Alert({ children, onClick, ...props }: AlertWrapperProps) {
  return (
    <MantineAlert onClick={onClick} {...props}>
      {children}
    </MantineAlert>
  )
}
