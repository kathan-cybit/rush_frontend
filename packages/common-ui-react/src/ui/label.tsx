"use client"

import React from "react"

import { Text } from "@mantine/core"
import type { TextProps } from "@mantine/core"

interface LabelProps extends TextProps {
  htmlFor?: string
  children: React.ReactNode
  className?: string
}

export function Label({ htmlFor, children, className, ...props }: LabelProps) {
  return (
    <Text
      component="label"
      htmlFor={htmlFor}
      size="sm"
      fw={500}
      className={className}
      {...props}
      style={{
        cursor: "pointer",
        userSelect: "none",
        ...props.style,
      }}
    >
      {children}
    </Text>
  )
}
