"use client"

import React from "react"
import { Skeleton as MantineSkeleton } from "@mantine/core"
import type { SkeletonProps } from "@mantine/core"

interface SkeletonWrapperProps extends SkeletonProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Skeleton({ children, onClick, ...props }: SkeletonWrapperProps) {
  return (
    <MantineSkeleton onClick={onClick} {...props}>
      {children}
    </MantineSkeleton>
  )
}
