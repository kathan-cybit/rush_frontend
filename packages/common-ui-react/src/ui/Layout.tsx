"use client"

import React from "react"
import {
  Group as MantineGroup,
  Stack as MantineStack,
  Container as MantineContainer,
  Center as MantineCenter,
} from "@mantine/core"
import type { GroupProps, StackProps, ContainerProps, CenterProps } from "@mantine/core"

interface GroupWrapperProps extends GroupProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

interface StackWrapperProps extends StackProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

interface ContainerWrapperProps extends ContainerProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

interface CenterWrapperProps extends CenterProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function Group({ children, onClick, ...props }: GroupWrapperProps) {
  return (
    <MantineGroup onClick={onClick} {...props}>
      {children}
    </MantineGroup>
  )
}

export function Stack({ children, onClick, ...props }: StackWrapperProps) {
  return (
    <MantineStack onClick={onClick} {...props}>
      {children}
    </MantineStack>
  )
}

export function Container({ children, onClick, ...props }: ContainerWrapperProps) {
  return (
    <MantineContainer onClick={onClick} {...props}>
      {children}
    </MantineContainer>
  )
}

export function Center({ children, onClick, ...props }: CenterWrapperProps) {
  return (
    <MantineCenter onClick={onClick} {...props}>
      {children}
    </MantineCenter>
  )
}
