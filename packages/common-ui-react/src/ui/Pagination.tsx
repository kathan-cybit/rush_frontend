"use client"

import React from "react"
import { Pagination as MantinePagination } from "@mantine/core"
import type { PaginationProps } from "@mantine/core"

interface PaginationWrapperProps extends PaginationProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Pagination({ children, onClick, ...props }: PaginationWrapperProps) {
  return (
    <MantinePagination onClick={onClick} {...props}>
      {children}
    </MantinePagination>
  )
}
