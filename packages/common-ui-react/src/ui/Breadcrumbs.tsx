"use client"

import React from "react"
import { Breadcrumbs as MantineBreadcrumbs, Anchor } from "@mantine/core"
import type { BreadcrumbsProps } from "@mantine/core"

interface BreadcrumbsWrapperProps extends BreadcrumbsProps {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Breadcrumbs({ children, onClick, ...props }: BreadcrumbsWrapperProps) {
  return (
    <MantineBreadcrumbs onClick={onClick} {...props}>
      {children}
    </MantineBreadcrumbs>
  )
}

export const BreadcrumbItem = Anchor
export const BreadcrumbLink = Anchor
export const BreadcrumbPage = "span"
export const BreadcrumbSeparator = "span"
export const BreadcrumbList = "div"
