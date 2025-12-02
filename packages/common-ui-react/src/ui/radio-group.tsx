"use client"

import React from "react"

import { Radio as MantineRadio, Stack } from "@mantine/core"
import type { RadioGroupProps as MantineRadioGroupProps, RadioProps } from "@mantine/core"

interface RadioGroupProps extends Omit<MantineRadioGroupProps, "children"> {
  children: React.ReactNode
  className?: string
  orientation?: "horizontal" | "vertical"
}

export function RadioGroup({ children, orientation = "vertical", className, ...props }: RadioGroupProps) {
  return (
    <MantineRadio.Group {...props} className={className}>
      {orientation === "horizontal" ? (
        <div style={{ display: "flex", gap: "16px" }}>{children}</div>
      ) : (
        <Stack gap="xs">{children}</Stack>
      )}
    </MantineRadio.Group>
  )
}

interface RadioGroupItemProps extends RadioProps {
  value: string
  id?: string
}

export function RadioGroupItem({ value, id, ...props }: RadioGroupItemProps) {
  return <MantineRadio value={value} id={id} {...props} />
}
