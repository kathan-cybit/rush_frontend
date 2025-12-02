"use client"

import React from "react"
import { Progress as MantineProgress } from "@mantine/core"
import type { ProgressProps } from "@mantine/core"

interface ProgressWrapperProps extends ProgressProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Progress({ children, onClick, ...props }: ProgressWrapperProps) {
  return (
    <MantineProgress onClick={onClick} {...props}>
      {children}
    </MantineProgress>
  )
}
