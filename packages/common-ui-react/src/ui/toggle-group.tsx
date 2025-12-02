"use client"

import React from "react"

import { SegmentedControl } from "@mantine/core"
import type { SegmentedControlProps } from "@mantine/core"

interface ToggleGroupProps extends Omit<SegmentedControlProps, "data"> {
  children: React.ReactNode
  type?: "single" | "multiple"
  className?: string
  orientation?: "horizontal" | "vertical"
}

export function ToggleGroup({
  children,
  type = "single",
  className,
  orientation = "horizontal",
  ...props
}: ToggleGroupProps) {
  // Convert children to data format expected by SegmentedControl
  const data =
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ value: string; children: React.ReactNode }>;
        return {
          value: element.props.value || "",
          label: element.props.children || "",
        }
      }
      return { value: "", label: "" }
    }) || []

  return <SegmentedControl {...props} data={data} className={className} orientation={orientation} />
}

interface ToggleGroupItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function ToggleGroupItem({ value, children, className }: ToggleGroupItemProps) {
  // This component is used for type safety but actual rendering is handled by ToggleGroup
  return null
}
