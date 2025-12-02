"use client"

import React from "react"
import { Avatar as MantineAvatar } from "@mantine/core"
import type { AvatarProps } from "@mantine/core"
import { cn } from "../library/utils"

interface AvatarWrapperProps extends AvatarProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Avatar({ children, onClick, ...props }: AvatarWrapperProps) {
  return (
    <MantineAvatar onClick={onClick} {...props}>
      {children}
    </MantineAvatar>
  )
}

export const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
      {...props}
    />
  ),
)
AvatarFallback.displayName = "AvatarFallback"