"use client"

import React from "react"
import { Switch as MantineSwitch } from "@mantine/core"
import type { SwitchProps } from "@mantine/core"

interface SwitchWrapperProps extends SwitchProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

export function Switch({ children, onClick, ...props }: SwitchWrapperProps) {
  return (
    <div>
      <MantineSwitch onClick={onClick} {...props} />
      {children && <div>{children}</div>}
    </div>
  )
}
