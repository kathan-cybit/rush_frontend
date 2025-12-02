"use client"

import React from "react"
import { Loader as MantineLoader } from "@mantine/core"
import type { LoaderProps } from "@mantine/core"

interface LoaderWrapperProps extends LoaderProps {
  children?: React.ReactNode
 onClick?: React.MouseEventHandler<SVGSVGElement>
}

export function Loader({ children, onClick, ...props }: LoaderWrapperProps) {
  return (
    <MantineLoader onClick={onClick} {...props}>
      {children}
    </MantineLoader>
  )
}
