"use client"

import React from "react"
import { Select as MantineSelect, MultiSelect as MantineMultiSelect } from "@mantine/core"
import type { SelectProps, MultiSelectProps } from "@mantine/core"

interface SelectWrapperProps extends SelectProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

interface MultiSelectWrapperProps extends MultiSelectProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

export function Select({ children, onClick, ...props }: SelectWrapperProps) {
  return (
    <MantineSelect onClick={onClick} {...props}>
      {children}
    </MantineSelect>
  )
}

export function MultiSelect({ children, onClick, ...props }: MultiSelectWrapperProps) {
  return (
    <MantineMultiSelect onClick={onClick} {...props}>
      {children}
    </MantineMultiSelect>
  )
}
