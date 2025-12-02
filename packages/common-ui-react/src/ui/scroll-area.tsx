"use client"

import React from "react"

import { ScrollArea as MantineScrollArea } from "@mantine/core"
import type { ScrollAreaProps as MantineScrollAreaProps } from "@mantine/core"

interface ScrollAreaProps extends MantineScrollAreaProps {
  children: React.ReactNode
  className?: string
}

export function ScrollArea({ children, className, ...props }: ScrollAreaProps) {
  return (
    <MantineScrollArea {...props} className={className}>
      {children}
    </MantineScrollArea>
  )
}

export function ScrollBar() {
  return null // Mantine handles scrollbars internally
}
