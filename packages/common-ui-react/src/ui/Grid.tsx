"use client"

import React from "react"
import { SimpleGrid as MantineSimpleGrid } from "@mantine/core"
import type { SimpleGridProps } from "@mantine/core"

interface SimpleGridWrapperProps extends SimpleGridProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function SimpleGrid({ children, onClick, ...props }: SimpleGridWrapperProps) {
  return (
    <MantineSimpleGrid onClick={onClick} {...props}>
      {children}
    </MantineSimpleGrid>
  )
}
