"use client"

import React from "react"
import { Checkbox as MantineCheckbox, Anchor as MantineAnchor } from "@mantine/core"
import type { CheckboxProps, AnchorProps } from "@mantine/core"

interface CheckboxWrapperProps extends CheckboxProps {
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

interface AnchorWrapperProps extends AnchorProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export function Checkbox({ onClick, ...props }: CheckboxWrapperProps) {
  return (
    <MantineCheckbox onClick={onClick} {...props} />
  )
}

export function Anchor({ children, onClick, ...props }: AnchorWrapperProps) {
  return (
    <MantineAnchor onClick={onClick} {...props}>
      {children}
    </MantineAnchor>
  )
}
