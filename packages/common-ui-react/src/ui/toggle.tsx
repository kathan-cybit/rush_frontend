"use client"
import React from "react"
import { Switch } from "@mantine/core"
import type { SwitchProps } from "@mantine/core"

interface ToggleProps extends Omit<SwitchProps, "checked" | "onChange"> {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  className?: string
  variant?: "default" | "outline"
}

export function Toggle({ pressed, onPressedChange, className, variant = "default", ...props }: ToggleProps) {
  return (
    <Switch
      {...props}
      checked={pressed}
      onChange={(event) => onPressedChange?.(event.currentTarget.checked)}
      className={className}
      variant={variant === "outline" ? "outline" : "filled"}
    />
  )
}
