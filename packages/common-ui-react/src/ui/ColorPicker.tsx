"use client"

import React from "react"
import { ColorPicker as MantineColorPicker, ColorInput as MantineColorInput } from "@mantine/core"
import type { ColorPickerProps, ColorInputProps } from "@mantine/core"

interface ColorPickerWrapperProps extends ColorPickerProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

interface ColorInputWrapperProps extends ColorInputProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

export function ColorPicker({ children, onClick, ...props }: ColorPickerWrapperProps) {
  return (
    <MantineColorPicker onClick={onClick} {...props}>
      {children}
    </MantineColorPicker>
  )
}

export function ColorInput({ children, onClick, ...props }: ColorInputWrapperProps) {
  return (
    <MantineColorInput onClick={onClick} {...props}>
      {children}
    </MantineColorInput>
  )
}
