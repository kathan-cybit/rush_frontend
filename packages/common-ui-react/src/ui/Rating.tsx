"use client"

import React from "react"
import { Rating as MantineRating } from "@mantine/core"
import type { RatingProps } from "@mantine/core"

interface RatingWrapperProps extends RatingProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Rating({ children, onClick, ...props }: RatingWrapperProps) {
  return (
    <MantineRating onClick={onClick} {...props}>
      {children}
    </MantineRating>
  )
}
