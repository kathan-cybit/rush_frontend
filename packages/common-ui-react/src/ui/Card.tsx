"use client"

import React from "react"
import {
  Card as MantineCard,
  Paper as MantinePaper,
  Text,
  Title,
  Box,
  Divider,
} from "@mantine/core"
import type { CardProps, PaperProps } from "@mantine/core"
import { cn } from "../library/utils"

interface CardWrapperProps extends CardProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

interface PaperWrapperProps extends PaperProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Card({ children, onClick, ...props }: CardWrapperProps) {
  return (
    <MantineCard radius="md" shadow="sm" withBorder onClick={onClick} {...props}>
      {children}
    </MantineCard>
  )
}

export function Paper({ children, onClick, ...props }: PaperWrapperProps) {
  return (
    <MantinePaper onClick={onClick} {...props}>
      {children}
    </MantinePaper>
  )
}

// // Header, Content, Footer
// export const CardHeader = ({
//   title,
//   description,
//   children
// }: {
//   title: string
//   description?: string
//   children?: React.ReactNode
// }) => (
//   <Box className="bg-white border-b border-slate-100 p-4">
//     <Title order={4} className="text-slate-900">
//       {title}
//     </Title>
//     {description && (
//       <Text size="sm" c="dimmed" mt="xs">
//         {description}
//       </Text>
//     )}
//     {children && <Box mt="md">{children}</Box>}
//   </Box>
// )

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Box className={className}>{children}</Box>
)

export const CardFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Box className={cn("flex justify-end space-x-4 pt-4 border-t border-slate-100 bg-slate-50", className)}>
    {children}
  </Box>
)

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Box p="md" className={className}>
      {children}
    </Box>
  )
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Title order={4} className={className}>
      {children}
    </Title>
  )
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Text size="sm" c="dimmed" className={className}>
      {children}
    </Text>
  )
}
